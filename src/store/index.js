import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  cartList: {} // 购物车
};

export default new Vuex.Store({
  state,
  mutations
});
