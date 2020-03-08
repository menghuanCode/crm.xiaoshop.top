const name = 'zhai_crm_'
export function getLocal(key) {
  return localStorage.getItem(name + key)
}

export function getSession(key) {
  return sessionStorage.getItem(name + key)
}

export function setLocal(key, value) {
  return localStorage.setItem(name + key, value)
}
export function setSession(key, value) {
  return sessionStorage.setItem(name + key, value)
}
export function removeLocal(key) {
  return localStorage.removeItem(name + key)
}
export function removeSession(key) {
  return sessionStorage.removeItem(name + key)
}