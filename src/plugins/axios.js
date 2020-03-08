"use strict";

import Vue from 'vue';
import axios from "axios";
import Nprogress from './nprogress'
import {
  getToken
} from '../helper/auth'
import store from '../store'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.VUE_APP_APIBASE,
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    Nprogress.start()
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    Nprogress.done()
    // Do something with response data
    return response;
  },
  function (error) {
    Nprogress.done()
    // Do something with response error
    return Promise.reject(error.response.data);
  }
);

Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)
export default _axios;