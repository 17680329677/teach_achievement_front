import request from '@/utils/request'

export function getAllCollegeInfo() {
  return request({
    url: '/sadmin/college/index',
    method: 'get',
  })
}

export function collegeUpdate(id, college_name) {
  return request({
    url: '/sadmin/college/update',
    method: 'post',
    data: {
      id: id,
      college_name: college_name
    }
  })
}

export function collegeDelete(id) {
  return request({
    url: '/sadmin/college/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function collegeAdd(id,college_name) {
  return request({
    url: '/sadmin/college/add',
    method: 'post',
    data: {
      id: id,
      college_name: college_name
    }
  })
}
