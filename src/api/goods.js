import axios from '../plugins/axios'

export function find() {
  return axios({
    url: '/zhai/goods',
    method: 'get'
  })
}

export function findById(id) {
  return axios({
    url: '/zhai/goods/' + id,
    method: 'get'
  })
}

export function del(id) {
  return axios({
    url: '/zhai/goods/' + id,
    method: 'delete'
  })
}


export default {
  find,
  findById,
  del
}