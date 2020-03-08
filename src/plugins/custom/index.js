"use strict";
import Vue from 'vue'
import Msg from './components/msg'

const componets = [
  Msg,
]

function install(Vue) {
  componets.forEach(function (component) {
    Vue.use(component)
  })
}

const Plugin = {};

Plugin.install = install

Vue.use(Plugin)
