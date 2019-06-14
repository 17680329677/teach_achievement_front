import request from '@/utils/request'
/*
*     教师类型配置 TeacherCategory
* */

//获取教改项目等级信息
export function teacherCategoryGet() {
  return request({
    url: '/sadmin/teacher_category/get',
    method: 'get'
  })
}

//添加  配置
export function teacherCategoryAdd(name) {
  return request({
    url: '/sadmin/teacher_category/add',
    method: 'post',
    data: {
      name: name
    }
  })
}

//删除  配置
export function teacherCategoryDelete(id) {
  return request({
    url: '/sadmin/teacher_category/del',
    method: 'post',
    data: {
      id: id
    }
  })
}

//更新  配置
export function teacherCategoryUpdate(id, name) {
  return request({
    url: '/sadmin/teacher_category/update',
    method: 'post',
    data: {
      id: id,
      name: name
    }
  })
}

