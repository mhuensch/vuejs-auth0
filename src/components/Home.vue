<template>
  <div>
    <div v-if="isAuthenticated">
      <h1>Welcome {{userProfile.nickname}}!</h1>
      This is your custom view of this page.
      <br/> Name: {{userProfile.name}}
      <br/> Nickname: {{userProfile.nickname}}
      <br/> Picture:
      <br/> <img :src="userProfile.picture" />
    </div>

    <div v-else>
      <h1>Welcome Home!</h1>
      You are seeing the public view of this page. <br />
      Login to your information.
    </div>

  </div>
</template>

<script>
  function data () {
    let model =
      { authenticated: this.$authService.isAuthenticated()
      }
    return model
  }

  function mounted () {
    this.$authService.eventHub.$on('authChange', changedTo => {
      this.authenticated = changedTo
    })
  }

  function isAuthenticated () {
    return this.authenticated
  }

  function userProfile () {
    return this.$authService.getUserProfile()
  }

  let module =
    { name: 'Home'
    , data: data
    , mounted: mounted
    , computed:
      { isAuthenticated: isAuthenticated
      , userProfile: userProfile
      }
    }

  export default module
</script>
