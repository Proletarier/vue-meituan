import Vue from 'vue';
import Router from 'vue-router';

import home from '@/page/home';
import redirect from '@/page/redirect.vue';
import order from '@/page/order';
import mine from '@/page/mine';
import shop from '@/page/shop';
import menu from '@/page/menu';
import login from '@/page/login';
import qualification from '@/page/menu/children/qualification.vue';
import orderdetail from '@/page/order/children/orderdetail.vue';
import city from '@/page/city';
import addresslist from '@/page/mine/address/addresslist.vue';
import addaddress from '@/page/mine/address/addaddress.vue';
import poipicker from '@/page/mine/poipicker/poipicker.vue';

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
    component: mine,
    meta: { keepAlive: true },
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
];

export const mineRouter = [
  {
    path: '/mine/addresslist',
    component: addresslist
  },
  {
    path: '/mine/addaddress',
    component: addaddress
  },
  {
    path: '/mine/poipicker',
    component: poipicker,
    children: [{
      path: 'city',
      component: city
    }]
  }
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [ ...constantRouterMap,...mineRouter ]
});
