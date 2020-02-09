import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import http from './api'
import store from './store'
import './validate'

Vue.prototype.bus = new Vue()
Vue.config.productionTip = false;
Vue.prototype.$http  = http


const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

