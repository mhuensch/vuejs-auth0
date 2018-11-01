<template>
  <div>
    CALLBACK
  </div>
</template>

<script>
  function data () {
    this.$authService.handleAuthentication()
    return {}
  }

  let module =
    { name: 'callback'
    , data: data
    }

  export default module
</script>
