import auth0 from 'auth0-js'
// import eventHub from './eventHub'
import AUTH0_CONFIG from './auth0-variables'

export default function install (Vue, options) {
  Vue.prototype.$authService = new AuthService(Vue.prototype.$eventHub)
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
      , redirectUri: AUTH0_CONFIG.callbackUrl
      , responseType: 'token id_token'
      , scope: 'openid profile'
      }
    )
  }

  login (email) {
    this.auth0.passwordlessStart(
      { connection: 'email'
      , send: 'link'
      , email: email
      }
      , function (err, res) {
          if (err) return console.error(err)
          console.log(res)
        }
    )
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        if (err) throw err
        this.setUserProfile(authResult)
        this.eventHub.$emit('authChange', true)
      }
      else if (err) {
        this.eventHub.$emit('authChange', false)
        throw err
      }
    })
  }

  setUserProfile (authResult) {
    // Set the time that the Access Token will expire at
    let expiration = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )

    let payload = authResult.idTokenPayload || {}
    let profile =
      { uid: payload.sub
      , name: payload.name
      , nickname: payload.nickname
      , picture: payload.picture
      , tokens:
        { id: authResult.idToken
        , access: authResult.accessToken
        , expiration: expiration
        }
      , updated: Date.now()
      }

    localStorage.setItem('profile', JSON.stringify(profile))
  }

  getUserProfile () {
    return JSON.parse(localStorage.getItem('profile'))
  }

  logout () {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('profile')
    this.eventHub.$emit('authChange', false)
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // Access Token's expiration date
    console.log(localStorage.getItem('profile'))
    let profile = JSON.parse(localStorage.getItem('profile')) || {}
    let tokens = profile.tokens || {}
    let expiration = tokens.expiration || 0
    return Date.now() < expiration
  }
}
