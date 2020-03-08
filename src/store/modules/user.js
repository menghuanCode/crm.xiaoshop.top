import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/helper/auth'
import { resetRouter } from '../../router'

const state = {
  token: getToken(),
  id: '',
  name: '',
  avatar: '',
  introduction: '',
  role: -1
}

const mutations = {
  SET_ID(state, id) {
    state.id = id
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_ROLE(state, role) {
    state.role = role
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },
  SET_INTRODUCTION(state, introduction) {
    state.introduction = introduction
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(({ data }) => {
        let { token } = data
        commit('SET_TOKEN', token)
        setToken(token)
        return resolve()
      }).catch(error => {
        return reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(({ data }) => {
        if (!data) {
          reject('验证失败，请重新登录')
        }

        const { _id, role, name, avatar, introduction } = data
        commit('SET_ID', _id)
        commit('SET_ROLE', role)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        return resolve(data)
      }).catch(error => {
        return reject(error)
      })
    })
  },
  // user logout 
  logout({ commit, dispath }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', -1)
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispath('tagsView')

        resolve()
      }).catch(error => reject(error))
    })
  },
  // reset token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', -1)
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}