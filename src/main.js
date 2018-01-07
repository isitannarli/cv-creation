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
      image: localStorage.image ? JSON.parse(localStorage.image) : profileImage,
      message: {
        error: {
          text: '',
          class: 'error'
        },
        warning: {
          text: '',
          class: 'error'
        },
        success: {
          text: '',
          class: 'success'
        },
        info: {
          text: '',
          class: 'info'
        }
      }
    }
  },
  methods: {
    saveFile() {
      localStorage.setItem("cv", JSON.stringify(this.$root.cv));
      localStorage.setItem("image", JSON.stringify(this.$root.image));
    },
    alert(type, message, time) {

      if(time == null) {
        time = 6000;
      }

      this.message[type].text = message;

      const vm = this;

      setTimeout(function() {
        vm.message[type].text = '';
      }, time);
    },
    closeBox() {
      this.message.error.text = '';
      this.message.info.text = '';
      this.message.success.text = '';
      this.message.warning.text = '';
    }
  },
  render: function(createElement) {
    return createElement(App);
  }
})
