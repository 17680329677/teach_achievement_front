import request from '@/utils/request'

/*
*     教师项目父类型配置操作 ProjectType
* */

//获取教师职称信息
export function projectTypeGet() {
  return request({
    url: '/sadmin/project_type/get',
    method: 'get'
  })
}

//添加职称配置
export function projectTypeAdd(type_name, student_attend) {
  return request({
    url: '/sadmin/project_type/add',
    method: 'post',
    data: {
      type_name: type_name,
      student_attend: student_attend
    }
  })
}

//删除职称配置
export function projectTypeDelete(id) {
  return request({
    url: '/sadmin/project_type/del',
    method: 'post',
    data: {
      id: id
    }
  })
}

//更新职称配置
export function projectTypeUpdate(id, type_name, student_attend) {
  return request({
    url: '/sadmin/project_type/update',
    method: 'post',
    data: {
      id: id,
      type_name: type_name,
      student_attend: student_attend
    }
  })
}

