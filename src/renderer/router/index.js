import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'start-page',
      component: require('@/components/Start').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login-page',
      component: require('@/components/pages/Login').default
    },
    {
      path: '/client/:id',
      name: 'client-page',
      component: require('@/components/pages/Client').default,
      props: {showInfo: true},
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/client/:id/hardware',
      name: 'client-hardware-page',
      component: require('@/components/pages/Client').default,
      props: {showHardware: true},
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/client/:id/info',
      name: 'client-info-page',
      component: require('@/components/pages/Client').default,
      props: {showInfo: true},
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/client/:id/software',
      name: 'client-software-page',
      component: require('@/components/pages/Client').default,
      props: {showSoftware: true},
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('password') === null) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    } else {
      // console.log(localStorage.getItem('api'))
      // console.log('To start')
      // next({path: '/'})
      next()
    }
  } else {
    next()
  }
  //
  // else if (to.matched.some(record => record.meta.guest)) {
  //   if (localStorage.getItem('jwt') == null) {
  //     next()
  //   } else {
  //     next({name: 'userboard'})
  //   }
  // } else {
  //   next()
  // }
})

export default router
