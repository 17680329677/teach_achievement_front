import request from '@/utils/request'

/*
*     学期等级配置 semesterInfo
* */

//获取 学期等级配置 信息
export function semesterInfoGet() {
  return request({
    url: '/sadmin/semester_info/get',
    method: 'get'
  })
}

//添加 学期等级配置 配置
export function semesterInfoAdd(semester_name,status) {
  return request({
    url: '/sadmin/semester_info/add',
    method: 'post',
    data: {
      semester_name: semester_name,
      status: status
    }
  })
}

//删除 学期等级配置 配置
export function semesterInfoDelete(id) {
  return request({
    url: '/sadmin/semester_info/del',
    method: 'post',
    data: {
      id: id
    }
  })
}

//更新 学期等级配置 配置
export function semesterInfoUpdate(id, semester_name,status) {
  return request({
    url: '/sadmin/semester_info/update',
    method: 'post',
    data: {
      id: id,
      semester_name: semester_name,
      status: status
    }
  })
}

