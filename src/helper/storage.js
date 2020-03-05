
const obj = new Proxy({
  get: function (target, propKey, receiver) {
    console.log(`getters ${propKey}`)
    return Reflect.get(target, propKey, receiver)
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}`)
    return Reflect.set(target, propKey, value, receiver)
  }
})


const name = 'admin_'
export function getLocalStorage(key) {
  return localStorage.getItem(name + key)
}

export function getSessionStorage(key) {
  return sessionStorage.getItem(name + key)
}

export function setLocalStorage(key, value) {
  return localStorage.setItem(name + key, value)
}
export function setSessionStorage(key, value) {
  return sessionStorage.setItem(name + key, value)
}
export function removeLocalStorage(key) {
  return localStorage.removeItem(name + key)
}
export function removeSessionStorage(key) {
  return sessionStorage.removeItem(name + key)
}