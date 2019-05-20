import request from '@/utils/request'
import store from "../../store";

/*
*     当前学院 监考信息管理 invigilate
* */

//获得本学院所有监考信息
export function getInvigilateInfo() {
  return request({
    url: '/normal/invigilate/index',
    method: 'post',
    data: {
      token: store.getters.token
    }
  })
}

//获得某个 监考 详细信息
export function getDetailInvigilateInfo(id) {
  return request({
    url: '/normal/invigilate/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

//按状态 查基本信息
export function statusSearchInvigilate(status) {
  return request({
    url: '/normal/invigilate/status_search',
    method: 'post',
    data: {
      token: store.getters.token,
      status: status
    }
  })
}

//按类型和值
export function searchInvigilateInfo(search_type, search_value) {
  return request({
    url: '/normal/invigilate/search',
    method: 'post',
    data: {
      token: store.getters.token,
      search_type: search_type,
      search_value: search_value
    }
  })
}

//改变状态
export function changeInvigilateStatus(id,status) {
  return request({
    url: '/normal/invigilate/changestatus',
    method: 'post',
    data: {
      id: id,
      status: status
    }
  })
}

//新增监考信息
export function createItem( subject, semester_id, _class, exam_time, location, participate_teacher, ) {
  return request({
    url: '/normal/invigilate/create',
    method: 'post',
    data: {
      subject: subject,
      semester_id: semester_id,
      _class: _class,
      exam_time: exam_time,
      location: location,
      participate_teacher: participate_teacher,
      token: store.getters.token,
    }
  })
}

//修改信息
export function changeSubmitInfo(id, subject, semester_id, _class, exam_time, location, participate_teacher, ) {
  return request({
    url: '/normal/invigilate/submitInfo/change',
    method: 'post',
    data: {
      id: id,
      subject: subject,
      semester_id: semester_id,
      _class: _class,
      exam_time: exam_time,
      location: location,
      participate_teacher: participate_teacher,
      token: store.getters.token,
    }
  })
}


