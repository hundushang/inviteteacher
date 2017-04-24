// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Index from './components/index/index'
import Prizes from './components/prizes/prizes'
import Invite from './components/prizes/invite/invite'
import Success from './components/prizes/success/success'
import Exchangeinfo from './components/prizes/exchangeinfo/exchangeinfo'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import './common/less/index.less'
import './assets/layer/layer.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {
    path: '/',
    component: Index
    //redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/prizes',
    component: Prizes,
    redirect: '/prizes/invite',
    children: [
      {
        path: 'invite',
        component: Invite
      },
      {
        path: 'success',
        component: Success
      },
      {
        path: 'exchangeinfo',
        component: Exchangeinfo
      }
    ]
  }
]
let router = new VueRouter({
    //mode: 'history',
    'linkActiveClass': 'active',
    routes
  }
)
//post request payload to form data
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
