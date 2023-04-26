import service from "@/service";
import { getToken, setToken, removeToken } from '@/common/cookies';
import { setStore } from '@/common/utils';

const getDefaultState = () => ({
  token: getToken(),
  name: '',
  avatar: ''
});

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
};

const actions = {
  // user login
  login({ commit }, loginForm) {
    const { phone, captcha } = loginForm;
    return new Promise((resolve, reject) => {
      service.login({ phone, captcha }).then(result => {
        if (result) {
          const { token, face, name } = result
          setToken(token);
          commit('SET_TOKEN', token);
          setStore('userInfo', result)
          resolve(result);
        }
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      service.logout().then(result => {
        if (result) {
          removeToken();
          commit('RESET_STATE');
        }
        resolve();
      })
        .catch(error => {
          reject(error);
        });
    });
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
