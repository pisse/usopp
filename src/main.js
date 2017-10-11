// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false

import 'element-ui/lib/theme-default/index.css'
import '@/common/stylus/_base.styl'
import '../static/css/globe.css'
import '@/common/css/font-awesome.css'

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
