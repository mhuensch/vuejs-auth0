<template>
  <div>
    <h1>Login</h1>

    <div v-if="!sent">
      <p> Enter a valid email address to send your token to: </p>
      <input v-model="email" placeholder="email address"/>
      <button @click="login">Send Verification Email</button>
    </div>

    <div v-if="sent">
      Verification email sent to: {{email}}!
      <br/>Please check your email to confirm your email address.
    </div>
  </div>
</template>

<script>
  function data () {
    let model =
      { email: null
      , sent: false
      }
    return model
  }

  function login () {
    this.$authService.login(this.email)
    this.sent = true
  }

  let module =
    { name: 'login'
    , data: data
    , methods:
      { login: login
      }
    }


  export default module
</script>
