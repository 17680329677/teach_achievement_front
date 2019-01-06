import request from '@/utils/request'

export function login(username, password, type) {
  return request({
    url: '/login/teachers',
    method: 'post',
    data: {
      'username': username,
      'password': password,
      'type': type,
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/login/getinfo',
    method: 'post',
    data: {'token': token,}
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
