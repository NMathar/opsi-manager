import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start-page',
      component: require('@/components/Start').default
    },
    {
      path: '/client/:id',
      name: 'client-page',
      component: require('@/components/pages/Client').default,
      props: { showInfo: true }
    },
    {
      path: '/client/:id/hardware',
      name: 'client-hardware-page',
      component: require('@/components/pages/Client').default,
      props: { showHardware: true }
    },
    {
      path: '/client/:id/info',
      name: 'client-info-page',
      component: require('@/components/pages/Client').default,
      props: { showInfo: true }
    },
    {
      path: '/client/:id/software',
      name: 'client-software-page',
      component: require('@/components/pages/Client').default,
      props: { showSoftware: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
