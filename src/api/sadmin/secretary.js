import request from '@/utils/request'

export function getAllSecretaryInfo() {
  return request({
    url: '/sadmin/secretary/index',
    method: 'get'
  })
}


// 检索信息
export function searchSecretary(search_type, search_value) {
  return request({
    url: '/sadmin/secretary/search',
    method: 'post',
    data: {
      search_type: search_type,
      search_value: search_value
    }
  })
}

// 添加
export function secretaryAdd(number,college_id) {
  return request({
    url: '/sadmin/secretary/add',
    method: 'post',
    data: {
      number: number,
      college_id: college_id
    }
  })
}

// 重设密码
export function secretaryResetPassword(number) {
  return request({
    url: '/sadmin/secretary/reset_password',
    method: 'post',
    data: {
      number: number
    }
  })
}


// 删除
export function secretaryDelete(number) {
  return request({
    url: '/sadmin/secretary/delete',
    method: 'post',
    data: {
      number: number
    }
  })
}

/*
// 撤销老师的教务秘书职位
export function recallSecretary(id) {
  return request({
    url: '/sadmin/secretary/recall',
    method: 'post',
    data: {
      id: id
    }
  })
}

// 修改秘书的信息
export function updateSecretary(teacher_number, telephone, email) {
  return request({
    url: '/sadmin/secretary/update',
    method: 'post',
    data: {
      number: teacher_number,
      telephone: telephone,
      email: email
    }
  })
}
*/
