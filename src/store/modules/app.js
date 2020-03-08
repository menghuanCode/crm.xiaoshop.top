import {getLocal, setLocal} from '@/helper/cache'

let sidebarState = getLocal('sidebarState') ? !!+getLocal('sidebarState') : true

const state = {
  // sidebar: {
  //   opened: sidebarState,
  //   withoutAnimation: false
  // }
  sidebarState,
  device: 'desktop',  // Device: mobile, desktop
  side: getLocal('size') || 'medium'   // Size: small, medium
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebarState = !state.sidebarState
    setLocal('sidebarState', state.sidebarState - 0)
  },
  CLOSE_SIDEBAR: state => {
    state.sidebarState = false
    setLocal('sidebarState', state.sidebarState - 0)
  },
  SET_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    setLocal('size', size)
  }
}

const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSidebar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  setDevice({ commit }, device) {
    commit('SET_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}