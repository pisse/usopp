import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/entry/Dashboard'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
