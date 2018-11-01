// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from '@/App'
import router from '@/router'

// Install our auth service to make it availiable across all components
import authService from '@/plugins/authService'
Vue.use(authService)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue(
  { el: '#app'
  , router
  , components: { App }
  , template: '<App/>'
  }
)
/* eslint-enable no-new */
