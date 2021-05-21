import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    isAuthenticated: null,
  },
  mutations: {
    isSignIn(state){
      state.isAuthenticated = true
    }
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => state.isAuthenticated
  },
  actions: {
    login({commit}, email, password){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post(baseURL, {
          email : email,
          password : password
        })
        .then(resp => {
          console.log(resp)
          commit('isSignIn')
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('profile')
          reject(err)
        })
      })
  },
  },
  modules: {
  }
})
