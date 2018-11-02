import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Private from '@/components/Private'

Vue.use(Router)

let router = new Router(
  { routes:
    [ { path: '/', redirect: '/home' }
    , { path: '/home'
      , name: 'Home'
      , component: Home
      }
    , { path: '/login'
      , name: 'Login'
      , component: Login
      }
    , { path: '/private'
      , name: 'Private'
      , component: Private
      , meta:
        { requiresAuth: true
        }
      }
    ]
  }
)

router.beforeEach((to, from, next) => {
  // First get copy of the AuthService.  It feels a bit hacky
  // to go after the prototype, but I'm not sure what else works here.
  // So, if the auth service hasn't been installed into the Vue prototype
  // default to at least return an invalid auth.
  let authService = Vue.prototype.$authService ||
    { isAuthenticated () {
        return false
      }
    }

  // Check if the to path has an auth requirement.  If it has an auth requirement
  // confirm that the user is logged in, or send the user to the login page.
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authService.isAuthenticated()) return next()
    next(
      { path: '/login'
      , params: { nextUrl: to.fullPath }
      }
    )
  }

  // Go to the expected next page (i.e. the to path)
  next()
})


export default router
