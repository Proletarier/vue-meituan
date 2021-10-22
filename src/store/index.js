import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-cycle
import user from './modules/user';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  cartList: {} // 购物车
};

export default new Vuex.Store({
  state,
  mutations,
  user
});
