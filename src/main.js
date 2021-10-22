import Vue from 'vue';
import axios from 'axios';
import message from '@/components/Message/message';
import App from './App.vue';
import router from './router/router';
import store from './store';

import './style/base.styl';
import '@/permission'; // permission control

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$message = message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
