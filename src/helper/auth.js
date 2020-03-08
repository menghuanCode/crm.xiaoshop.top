import { getLocal, setLocal, removeLocal } from './cache'

const tokenKey = 'token'

export function getToken() {
  return getLocal(tokenKey)
}

export function setToken(token) {
  return setLocal(tokenKey, token)
}

export function removeToken() {
  return removeLocal(tokenKey)
}