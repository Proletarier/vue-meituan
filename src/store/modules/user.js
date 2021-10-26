import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

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
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // user login
  login({ commit }, loginForm) {
    const { phone, captcha } = loginForm;
    return new Promise((resolve, reject) => {
      login(phone, captcha)
        .then(response => {
          const token = response.data;
          setToken(token);
          commit('SET_TOKEN', token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const data = response.data;
          if (!data) {
            return reject('Verification failed, please Login again.');
          }

          commit('SET_NAME', data.username);
          commit('SET_AVATAR', 'https://img1.baidu.com/it/u=3322691522,2053114764&fm=224&fmt=auto&gp=0.jpg');
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          commit('RESET_STATE');
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      removeToken();
      resolve();
    });
  },

  // remove token
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
