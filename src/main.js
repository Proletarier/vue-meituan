import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import App from './App.vue';
import routes from './router/router';
import store from './store';

import './style/base.styl';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
