import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router/router';
import store from './store';

import './style/base.styl';
import '@/permission'; // permission control

import dialog from '@/components/dialog/dialog'
import message from '@/components/message/message';
import loading from '@/components/loading/loading';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$message = message;
Vue.prototype.$dialog = dialog;

Vue.use(loading)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default vue
