import axios from '../plugins/axios'

export function find() {
  return axios({
    url: '/zhai/shop',
    method: 'get'
  })
}

export function findById(id) {
  return axios({
    url: '/zhai/shop/' + id,
    method: 'get'
  })
}

export default {
  find,
  findById
}