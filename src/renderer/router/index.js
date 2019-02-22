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
      component: require('@/components/pages/Client').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
