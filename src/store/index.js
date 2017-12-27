import Vue from 'vue'
import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    newRow (state) {
      state.count++
    }
  }
})
