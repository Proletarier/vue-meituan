import { setStore } from '@/common/utils';

const getDefaultState = () => ({
  location: {
    place: '',
    lat: undefined,
    lng: undefined
  }
});
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_LOCATION: (state, location) => {
    state.location = location;
  },
};

const actions = {
  setLocation({ commit }, params= {}) {
    const { place, lat, lng } = params
    if (place && lat && lng) {
      commit('SET_LOCATION', params);
      setStore('location',`${lat},${lng}`)
    } else {
      commit('SET_LOCATION', {
        place: '定位失败'
      });
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
