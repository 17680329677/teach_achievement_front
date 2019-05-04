import request from '@/utils/request'
import store from "../../store";

/*
*     当前学院教师信息管理 teacherInfo
* */

//获得本学院所有教师详细信息
export function getAllReformPaperInfo() {
  return request({
    url: '/cadmin/reform_paper/index',
    method: 'post',
    data: {
      token: store.getters.token
    }
  })
}

//获得某个图书详细信息
export function getDetailReformPaperInfo(id) {
  return request({
    url: '/cadmin/reform_paper/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

//修改信息
export function changeSubmitInfo(id,order,paper_name,paper_number,journal_name,
                                 publish_year_month,journal_year,journal_number,
                                 college_id,journal_volum,status,source_project,
                                 cover_path,content_path,text_path,cnki_url,
                                 participate_teacher ) {
  return request({
    url: '/cadmin/reform_paper/submitInfo/change',
    method: 'post',
    data: {
      id: id,
      order: order,
      paper_name: paper_name,
      paper_number: paper_number,
      journal_name: journal_name,
      publish_year_month: publish_year_month,
      journal_year: journal_year,
      journal_number: journal_number,
      college_id: college_id,
      journal_volum: journal_volum,
      status: status,
      source_project: source_project,
      cover_path: cover_path,
      content_path: content_path,
      text_path: text_path,
      cnki_url: cnki_url,
      participate_teacher: participate_teacher,
    }
  })
}

//论文状态更变  [  （1未提交、2提交/待审核、3存档/已审核）  ]
export function reformPaperChangeStatus(id, status) {
  return request({
    url: '/cadmin/reform_paper/changestatus',
    method: 'post',
    data: {
      id: id,
      status: status
    }
  })
}

//按状态搜索
export function statusSearchReformPaper(status) {
  return request({
    url: '/cadmin/reform_paper/status_search',
    method: 'post',
    data: {
      token: store.getters.token,
      status: status
    }
  })
}

//按教改论文姓名和教师姓名搜索
export function searchReformPaperInfo(search_type, search_value) {
  return request({
    url: '/cadmin/reform_paper/search',
    method: 'post',
    data: {
      token: store.getters.token,
      search_type: search_type,
      search_value: search_value
    }
  })
}
