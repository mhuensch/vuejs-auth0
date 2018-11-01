import auth0 from 'auth0-js'
import AUTH0_CONFIG from '@/plugins/auth0-variables'

export default function install (Vue, options) {
  // Creating a new Vue instance is the simplest way to have an event hub.
  let eventHub = new Vue()
  let authService = new AuthService(eventHub)

  Vue.prototype.$authService = authService
  if (window.location.pathname === AUTH0_CONFIG.callbackPath) {
    authService.onAuthCallback()
  }
}

class AuthService {
  constructor (eventHub) {
    this.eventHub = eventHub
    this.login = this.login.bind(this)
    this.setUserProfile = this.setUserProfile.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.auth0 = new auth0.WebAuth(
      { domain: AUTH0_CONFIG.domain
      , clientID: AUTH0_CONFIG.clientId
      , redirectUri: window.location.origin + AUTH0_CONFIG.callbackPath
      , responseType: 'token id_token'
      , scope: 'openid profile'
      }
    )
  }

  login (email, type) {
    // Passwordless login made simple.  We'll default this to
    // a magic link, but can also support a secret code.
    let options =
      { connection: 'email'
      , send: type || 'link'
      , email: email
      }

    // Send the email to the user through Auth0
    this.auth0.passwordlessStart(options, (err, res) => {
      if (err) throw err
    })
  }

  verifySecretCode (email, code) {
    // This is used when sending an email with a code in it.
    // The user must supply the email and code they recieved,
    // so that we can convert that information into a profile using
    // the onAuthCallback process.
    let options =
      { connection: 'email'
      , email: email
      , verificationCode: code
      }

    this.auth0.passwordlessLogin(options, (err, res) => {
      if (err) throw err
    })
  }

  onAuthCallback () {
    // This is called when the user clicks on the magic link in their email
    // Or when a email and code are submitted back to Auth0 for verification.
    // When this service is attached to a Vue instance in the installationabove,
    // if the route path matches our callback, we'll parsh the url hash here.
    this.auth0.parseHash((err, authResult) => {
      // No matter what happened, reset the windows location
      // to help prevent bleeding the token.
      window.location.replace('/')

      // If the auth failed for any reason, tell the clients
      // we're not logged in and throw an error.
      if (err || !authResult) {
        this.eventHub.$emit('authChange', false)
        if (err) console.log(err)
        throw new Error('Could not parse a valid hash from callback')
      }

      // Save the user profile and notify and listeners that we're auth'd
      this.setUserProfile(authResult)
      this.eventHub.$emit('authChange', true)
    })
  }

  setUserProfile (authResult) {
    // Convert the auth result into something we can use.
    // As we don't really care about the tokens as much from this point forward,
    // we're going to list them under the profile rather than 1st class citizens.
    let payload = authResult.idTokenPayload || {}
    let profile =
      { uid: payload.sub
      , name: payload.name
      , nickname: payload.nickname
      , picture: payload.picture
      , tokens:
        { id: authResult.idToken
        , access: authResult.accessToken
        , expiration: authResult.expiresIn * 1000 + Date.now()
        }
      , updated: Date.now()
      }

    // Put the profile in local storage for quick access.
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  getUserProfile () {
    // Read the profile from local storage.
    return JSON.parse(localStorage.getItem('profile'))
  }

  logout () {
    // Clear Access Token and ID Token from local storage
    this.auth0.logout()
    // Log us out of the auth0 session
    localStorage.removeItem('profile')
    // And notify any listeners that we are no longer auth'd
    this.eventHub.$emit('authChange', false)
  }

  isAuthenticated () {
    // Check the current profile to see if the expiration date is passed.
    // NOTE: if no profile exists we will end up checking that now < 0.
    let profile = JSON.parse(localStorage.getItem('profile') || '{}')
    let tokens = profile.tokens || {}
    let expiration = tokens.expiration || 0
    return Date.now() < expiration
  }
}
