import request from '@/utils/request'

/*
*     教师类型配置信息 TeacherType
* */

//获取教师类型信息
export function teacherTypeGet() {
  return request({
    url: '/sadmin/teacher_type/get',
    method: 'get'
  })
}

//更新类型配置
export function teacherTypeUpdate(id, type_name) {
  return request({
    url: '/sadmin/teacher_type/update',
    method: 'post',
    data: {
      id: id,
      type_name: type_name
    }
  })
}

