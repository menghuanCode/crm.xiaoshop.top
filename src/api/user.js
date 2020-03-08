import axios from '../plugins/axios'

export function login(data) {
  return axios({
    url: '/admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return axios({
    url: '/admin/user/info',
    method: 'get'
  })
}

export function logout() {
  return axios({
    url: '/admin/user/logout',
    method: 'post'
  })
}

export function getUsers() {
  return axios({
    url: '/user',
    method: 'get'
  })
}
