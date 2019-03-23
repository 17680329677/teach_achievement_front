import request from '@/utils/request'

/*
*     教师职称配置 TeacherTitle
* */

//获取教师职称信息
export function teacherTitleGet() {
  return request({
    url: '/sadmin/teacher_title/get',
    method: 'get'
  })
}

//添加职称配置
export function teacherTitleAdd(name, type_id) {
  return request({
    url: '/sadmin/teacher_title/add',
    method: 'post',
    data: {
      name: name,
      type_id: type_id
    }
  })
}

//删除职称配置
export function teacherTitleDelete(id) {
  return request({
    url: '/sadmin/teacher_title/del',
    method: 'post',
    data: {
      id: id
    }
  })
}

//更新职称配置
export function teacherTitleUpdate(id, name, type_id) {
  return request({
    url: '/sadmin/teacher_title/update',
    method: 'post',
    data: {
      id: id,
      name: name,
      type_id: type_id
    }
  })
}

