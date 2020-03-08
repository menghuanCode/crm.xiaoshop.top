import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, path) => {
  // get './app.js' => 'app'
  const name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(path)
  modules[name] = value.default
  return modules
}, {})


const store = new Vuex.Store({
  modules,
  getters
})

export default store
