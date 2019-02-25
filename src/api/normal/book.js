import request from '@/utils/request'
import store from '../../store'

export function getAllBookInfo() {
  return request({
    url: '/normal/book/index',
    method: 'post',
    data: {
      number: store.getters.token
    }
  })
}

export function getDetailBookInfo(id) {
  return request({
    url: '/normal/book/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function changeToSubmit(id) {
  return request({
    url: '/normal/book/changestatus/submit',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function recallSubmit(id) {
  return request({
    url: '/normal/book/changestatus/recallsubmit',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteBookInfo(id) {
  return request({
    url: '/normal/book/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function searchBookInfo(search_type, search_value) {
  return request({
    url: '/normal/book/search',
    method: 'post',
    data: {
      number: store.getters.token,
      search_type: search_type,
      search_value: search_value
    }
  })
}
