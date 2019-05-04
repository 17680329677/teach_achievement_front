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
export function changeReformSubmitInfo(id, book_name, book_number, publish_time, pages, words, isbn, press,
                                 version, style, rank_id, college, project, status, cover_path,
                                 copy_path, content_path, authors) {
  return request({
    url: '/cadmin/book/submitInfo/change',
    method: 'post',
    data: {
      id: id,
      book_name: book_name,
      book_number: book_number,
      publish_time: publish_time,
      pages: pages,
      words: words,
      isbn: isbn,
      press: press,
      version: version,
      style: style,
      rank_id: rank_id,
      college: college,
      project: project,
      status: status,
      cover_path: cover_path,
      copy_path: copy_path,
      content_path: content_path,
      authors: authors,
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
