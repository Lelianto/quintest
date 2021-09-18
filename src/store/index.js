import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async getTorque() {
      return await axios.get('https://cors-anywhere.herokuapp.com/https://b507qiqddb.execute-api.eu-central-1.amazonaws.com/torque')
    },
  },
  modules: {
  }
})
