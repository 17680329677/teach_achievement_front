import request from '@/utils/request'

export function getAllSecretaryInfo() {
  return request({
    url: '/secretary/index',
    method: 'get'
  })
}

// 撤销老师的教务秘书职位
export function recallSecretary(id) {
  return request({
    url: '/secretary/recall',
    method: 'post',
    data: {
      id: id
    }
  })
}

// 修改秘书的信息
export function updateSecretary(teacher_number, telephone, email) {
  return request({
    url: '/secretary/update',
    method: 'post',
    data: {
      number: teacher_number,
      telephone: telephone,
      email: email
    }
  })
}

// 检索信息
export function searchSecretary(search_type, search_value) {
  return request({
    url: '/secretary/search',
    method: 'post',
    data: {
      search_type: search_type,
      search_value: search_value
    }
  })
}
