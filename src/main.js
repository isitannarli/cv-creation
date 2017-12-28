import Vue from 'vue'
import App from './App.vue'
import _ from 'lodash'

import cv from './cv.json';

import profileImage from './assets/headshot.jpg';

new Vue({
  el: '#app',
  data() {
    return {
      cv: localStorage.cv ? JSON.parse(localStorage.cv) : cv,
      image: localStorage.image ? JSON.parse(localStorage.image) : profileImage
    }
  },
  render: h => h(App)
})
