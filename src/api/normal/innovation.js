import request from '@/utils/request'
import store from "../../store";

/*
*     当前学院 大创项目管理 innovation
* */

//获得本学院所有 详细信息
export function getInnovationInfo() {
  return request({
    url: '/normal/innovation/index',
    method: 'post',
    data: {
      token: store.getters.token
    }
  })
}

//获得某个 详细信息
export function getDetailInnovationInfo(id) {
  return request({
    url: '/normal/innovation/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

//按状态 查基本信息
export function statusSearchInnovation(status) {
  return request({
    url: '/normal/innovation/status_search',
    method: 'post',
    data: {
      token: store.getters.token,
      status: status
    }
  })
}

//按类型和值
export function searchInnovationInfo(search_type, search_value) {
  return request({
    url: '/normal/innovation/search',
    method: 'post',
    data: {
      token: store.getters.token,
      search_type: search_type,
      search_value: search_value
    }
  })
}

//改变状态
export function changeInnovationStatus(id,status) {
  return request({
    url: '/normal/innovation/changestatus',
    method: 'post',
    data: {
      id: id,
      status: status
    }
  })
}

//添加信息
export function createItem(project_name, project_number, rank_id,
                           begin_year_month, mid_check_year_month, end_year_month,
                           mid_check_rank, end_check_rank,
                           subject, host_student, participant_student, remark) {
  return request({
    url: '/normal/innovation/create',
    method: 'post',
    data: {
      project_name: project_name,
      project_number: project_number,
      rank_id: rank_id,
      begin_year_month: begin_year_month,
      mid_check_year_month: mid_check_year_month,
      end_year_month: end_year_month,
      mid_check_rank: mid_check_rank,
      end_check_rank: end_check_rank,
      subject: subject,
      //status: status,
      host_student: host_student,
      participant_student: participant_student,
      remark: remark,
      token: store.getters.token,
    }
  })
}

//修改信息
export function changeSubmitInfo(id, project_name, project_number, rank_id,
                                 begin_year_month, mid_check_year_month, end_year_month,
                                 mid_check_rank, end_check_rank,
                                 subject, host_student, participant_student, remark) {
  return request({
    url: '/normal/innovation/submitInfo/change',
    method: 'post',
    data: {
      id: id,
      project_name: project_name,
      project_number: project_number,
      rank_id: rank_id,
      begin_year_month: begin_year_month,
      mid_check_year_month: mid_check_year_month,
      end_year_month: end_year_month,
      mid_check_rank: mid_check_rank,
      end_check_rank: end_check_rank,
      subject: subject,
      //status: status,
      host_student: host_student,
      participant_student: participant_student,
      remark: remark,
      token: store.getters.token,
    }
  })
}


