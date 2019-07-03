// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout'
import router from './router'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

// axios 配置
axios.defaults.timeout = 5000;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'json';
// axios.defaults.baseURL = 'http://localhost:8080/项目名/';
axios.defaults.baseURL = 'http://localhost:8081/';


/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>'
})
