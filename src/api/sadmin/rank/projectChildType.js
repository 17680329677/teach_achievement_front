import request from '@/utils/request'

/*
*     教师项目子类型 ProjectChildType
* */

//获取项目子类型信息
export function projectChildTypeGet() {
  return request({
    url: '/sadmin/project_child_type/get',
    method: 'get'
  })
}

//添加项目子类型配置
export function projectChildTypeAdd(child_type_name, parent_type_id) {
  return request({
    url: '/sadmin/project_child_type/add',
    method: 'post',
    data: {
      child_type_name: child_type_name,
      parent_type_id: parent_type_id
    }
  })
}

//删除项目子类型配置
export function projectChildTypeDelete(id) {
  return request({
    url: '/sadmin/project_child_type/del',
    method: 'post',
    data: {
      id: id
    }
  })
}

//更新项目子类型配置
export function projectChildTypeUpdate(id, child_type_name, parent_type_id) {
  return request({
    url: '/sadmin/project_child_type/update',
    method: 'post',
    data: {
      id: id,
      child_type_name: child_type_name,
      parent_type_id: parent_type_id
    }
  })
}

