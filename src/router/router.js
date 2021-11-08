import Vue from 'vue';
import Router from 'vue-router';

import home from '../page/home/home.vue';
import redirect from '../page/redirect.vue';
import order from '../page/order/order.vue';
import mine from '../page/mine/mine.vue';
import shop from '../page/shop/shop.vue';
import menu from '../page/menu/menu.vue';
import login from '../page/login/index.vue';
import qualification from '../page/menu/children/qualification.vue';
import orderdetail from '../page/order/children/orderdetail.vue';
import city from '../page/city/city.vue';
import addresslist from '@/page/mine/address/addresslist.vue';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/redirect',
    component: redirect,
    hidden: true,
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home,
    meta: { keepAlive: true }
  },
  {
    path: '/order',
    component: order
  },
  {
    path: '/orderdetail',
    component: orderdetail
  },
  {
    path: '/mine',
    component: mine
  },
  {
    path: '/shop',
    component: shop
  },
  {
    path: '/menu',
    component: menu,
    children: [{
      path: 'qualification',
      component: qualification
    }]
  },
  {
    path: '/city',
    component: city
  },
  {
    path: '/addresslist',
    component: addresslist
  }

];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
