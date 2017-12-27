import Vue from 'vue'
import App from './App.vue'
import _ from 'lodash'

import cv from './cv.json';

// import './store/index.js'

new Vue({
  el: '#app',
  data() {
    return {
      cv: cv,
    }
  },
  render: h => h(App)
})
