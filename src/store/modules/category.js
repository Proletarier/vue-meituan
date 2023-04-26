import service from "@/service";


const getDefaultState = () => ({
  kingkongList: []
});
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_CATETYPE: (state, kingkongList) => {
    state.kingkongList = kingkongList;
  },
};

const actions = {
  getCategory({ commit }, params= {}) {
    return new Promise((resolve, reject) => {
      service.listGoodsCate().then(data => {
        if (data) {
          commit('SET_CATETYPE', data);
          resolve(data);
        }
      }).catch(error => {
        reject(error);
      });
    });
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
