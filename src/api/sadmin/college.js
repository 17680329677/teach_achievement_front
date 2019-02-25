import request from '@/utils/request'

export function getAllCollegeInfo() {
  return request({
    url: '/sadmin/college/index',
    method: 'get',
  })
}

export function collegeUpdate(id, college_name, college_id) {
  return request({
    url: '/sadmin/college/update',
    method: 'post',
    data: {
      id: id,
      college_name: college_name,
      college_id: college_id
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

export function collegeAdd(college_name, college_id) {
  return request({
    url: '/sadmin/college/add',
    method: 'post',
    data: {
      college_name: college_name,
      college_id: college_id
    }
  })
}
