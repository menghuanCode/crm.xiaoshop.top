import { asyncRoutes, constrantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constrantRoutes.concat(routes)
  }
}

/**
 * 权限判断——是否有权限
 * @param {number} role 角色 
 * @param {route} route   路由
 */
function hasPermission(role, route) {
  if (!route.meta || !route.meta.role) {
    return true
  }

  return (role & route.meta.role) !== 0
}

/**
 * 递归过滤异步路由表
 * @param {*} routes 异步路由 
 * @param {*} role  角色
 */
export function filterAsyncRoutes(routes, role) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role)
      }
      res.push(tmp)
    }

    return res
  })
}

const actions = {
  generateRoutes({ commit }, role) {
    return new Promise(resolve => {
      // 管理员的权限是 2
      let accessRoutes = (role & 2) !== 0 ? asyncRoutes : filterAsyncRoutes(asyncRoutes, role)

      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}