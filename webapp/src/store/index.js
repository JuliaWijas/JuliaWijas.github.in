import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {
      username: '',
      email: '',
    }
  },
  getters: {
  },
  mutations: {
    authenticate(state) {
      state.isAuthenticated = true;
    }, 
    logout(state) {
      state.isAuthenticated = false;
    },
    login(state, data) {
      state.user = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
