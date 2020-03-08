import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/bluebird'
import './plugins/axios'
import './plugins/element'
import './plugins/vant'
import './plugins/nprogress'
import './plugins/custom'

import './permission'

import "./assets/scss/main.scss"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
