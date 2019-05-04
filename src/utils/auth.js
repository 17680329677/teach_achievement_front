import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TypeKey = 'User-Type'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}



export function getType() {
  return Cookies.get(TypeKey)
}

export function setType(type) {
  return Cookies.set(TypeKey, type)
}

export function removeType() {
  return Cookies.remove(TypeKey)
}
