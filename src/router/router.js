import home from '../page/home/home.vue';
import order from '../page/order/order.vue';
import mine from '../page/mine/mine.vue';
import shop from '../page/shop/shop.vue';
import menu from '../page/menu/menu.vue';
import login from '../page/login/index.vue';
import qualification from '../page/menu/children/qualification.vue';
import orderdetail from '../page/order/children/orderdetail.vue';
import city from '../page/city/city.vue';

// Vue.use(VueRouter);

// const router = new VueRouter({
//   routes
// });

export default [
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
  }

];
