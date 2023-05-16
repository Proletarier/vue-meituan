import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import point from './modules/point';
import category from './modules/category';
import cart from './modules/cart';

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    user,
    point,
    category,
    cart
  },
});
