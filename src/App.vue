<template>
  <div>
    <nav>
      <router-link to="/">
        Home
      </router-link>

      <button @click="logout()" v-if="isAuthenticated">
        Logout
      </button>

      <router-link to="/login" v-else>
        Login
      </router-link>
    </nav>

    <router-view>
    </router-view>

  </div>
</template>

<script>
function mounted () {
  this.$authService.eventHub.$on('authChange', changedTo => {
    this.authenticated = changedTo
    this.$router.replace('/home')
  })
}

function data () {
  let result =
    { authenticated: this.$authService.isAuthenticated()
    }
  return result
}

function isAuthenticated () {
  return this.authenticated
}

function logout () {
  this.$authService.logout()
}

let module =
  { name: 'app'
  , data: data
  , mounted: mounted
  , computed:
    { isAuthenticated: isAuthenticated
    }
  , methods:
    { logout: logout
    }
  }

export default module
</script>

<style>
  a {
    margin: 5px;
  }
</style>
