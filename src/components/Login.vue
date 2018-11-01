<template>
  <div>
    <h1>Login</h1>

    <div v-if="!sent">
      <p> Enter a valid email address to send your token to: </p>
      <input v-model="email" placeholder="email address"/>
      <button @click="login('link')">Send Magic Link</button>
      <button @click="login('code')">Send Secret Code</button>
    </div>

    <div v-if="sent">
      Verification email sent to: {{email}}!
      <br/>Please check your email.
    </div>

    <div v-if="waitForSecretCode">
      <input v-model="secretCode" placeholder="Your Secret Code"/>
      <button @click="confirmCode">Confirm Code</button>
    </div>
  </div>
</template>

<script>
  function data () {
    let model =
      { email: null
      , secretCode: null
      , sent: false
      , waitForSecretCode: false
      }
    return model
  }

  function login (type) {
    this.$authService.login(this.email, type)
    this.sent = true
    this.waitForSecretCode = type === 'code'
  }

  function confirmCode () {
    this.$authService.verifySecretCode(this.email, this.secretCode)
  }

  let module =
    { name: 'login'
    , data: data
    , methods:
      { login: login
      , confirmCode: confirmCode
      }
    }


  export default module
</script>
