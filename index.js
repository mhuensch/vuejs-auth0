// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './src/App'
import router from './src/router'

Vue.config.productionTip = false

// Install a simple event hub
import eventHub from '@/plugins/eventHub'
Vue.use(eventHub)

// Install a simple event hub
import authService from '@/plugins/authService'
Vue.use(authService)

/* eslint-disable no-new */
new Vue(
  { el: '#app'
  , router
  , components: { App }
  , template: '<App/>'
  }
)
