import Vue from 'vue';
import Router from 'vue-router';

import home from '@/page/home';
import redirect from '@/page/redirect.vue';
import order from '@/page/orderlist';
import mine from '@/page/mine';
import shop from '@/page/near-shop';
import menu from '@/page/shop';
import login from '@/page/login';
import qualification from '@/page/shop/qualification';
import orderdetail from '@/page/orderlist/children/orderdetail.vue';
import city from '@/page/city';
import addresslist from '@/page/address';
import addaddress from '@/page/address/add';
import site from '@/page/site';
import orderAdd from '@/page/order-add';


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
    meta: { keepAlive: false }
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
    name:'poipicker',
    path: '/mine/poipicker',
    component: site,
    children: [{
      path: 'city',
      component: city
    }]
  }
];

export const orderRouter =[
  {
    path: '/order',
    component: order
  },
  {
    path: '/orderdetail',
    component: orderdetail
  },
  {
    path: '/orderAdd',
    component: orderAdd
  },
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [ ...constantRouterMap,...mineRouter,...orderRouter ]
});
