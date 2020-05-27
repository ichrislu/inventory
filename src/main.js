// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './routers/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

import Print from 'vue-print-nb'

// axios.defaults.baseURL = process.env.NODE_ENV === 'mock' ? '/mock' : '/api'
// console.log('process.env.NODE_ENV', process.env.NODE_ENV)


Vue.prototype.$axios = axios

Vue.config.productionTip = false


Vue.use(ElementUI)
Vue.use(Print)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>'
})