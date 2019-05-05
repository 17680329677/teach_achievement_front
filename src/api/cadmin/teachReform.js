import request from '@/utils/request'
import store from "../../store";

/*
*     当前学院教改项目管理 TeachReformProject
* */

//获得本学院所有教改项目基本信息
export function getAllTeachReformInfo() {
  return request({
    url: '/cadmin/teach_reform/index',
    method: 'post',
    data: {
      token: store.getters.token
    }
  })
}

//按状态 查基本信息
export function statusSearchTeachReform(status) {
  return request({
    url: '/cadmin/teach_reform/status_search',
    method: 'post',
    data: {
      token: store.getters.token,
      status: status
    }
  })
}



//获得某个细信息
export function getDetailReformInfo(id) {
  return request({
    url: '/cadmin/teach_reform/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

//修改状态
export function changeStatus(id, status) {
  return request({
    url: '/cadmin/teach_reform/changestatus',
    method: 'post',
    data: {
      id: id,
      status: status
    }
  })
}

//修改信息
export function changeReformSubmitInfo(id, project_name, project_number, type_child_id, rank_id,
                                       begin_year_month, mid_check_year_month, end_year_month,
                                       mid_check_rank, end_check_rank,
                                       subject, host_student, participate_student, remark, grade ) {
  return request({
    url: '/cadmin/teach_reform/submitInfo/change',
    method: 'post',
    data: {
      id: id,
      project_name: project_name,
      project_number: project_number,
      type_child_id: type_child_id,
      rank_id: rank_id,
      begin_year_month: begin_year_month,
      mid_check_year_month: mid_check_year_month,
      end_year_month: end_year_month,
      mid_check_rank: mid_check_rank,
      end_check_rank: end_check_rank,
      subject: subject,
      host_student: host_student,
      participate_student: participate_student,
      remark: remark,
      grade: grade
    }
  })
}

export function searchReformInfo(search_type, search_value) {
  return request({
    url: '/cadmin/book/search',
    method: 'post',
    data: {
      token: store.getters.token,
      search_type: search_type,
      search_value: search_value
    }
  })
}
