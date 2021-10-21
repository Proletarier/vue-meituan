import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router/router';
import store from './store';

import './style/base.styl';
import '@/permission'; // permission control

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
