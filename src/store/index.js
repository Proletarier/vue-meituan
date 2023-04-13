import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import point from './modules/point';
import mutations from './mutations';
import getters from './getters'

Vue.use(Vuex);

const state = {
  cartList: {} // 购物车
};

export default new Vuex.Store({
  modules: {
    user,
    point
  },
  mutations,
  state,
  getters
});
