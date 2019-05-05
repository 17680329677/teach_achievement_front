import request from '@/utils/request'
import store from "../../store";

/*
*     当前学院 出版教材管理 book
* */

//获得本学院所有教师详细信息
export function getAllBookInfo() {
  return request({
    url: '/cadmin/book/index',
    method: 'post',
    data: {
      token: store.getters.token
    }
  })
}

//获得某个图书详细信息
export function getDetailBookInfo(id) {
  return request({
    url: '/cadmin/book/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

//改变状态
export function changeBookSubmit(id,status) {
  return request({
    url: '/cadmin/book/changestatus',
    method: 'post',
    data: {
      id: id,
      status: status
    }
  })
}

//修改信息
export function changeSubmitInfo(id, book_name, book_number, publish_time, pages, words, isbn, press,
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


//按照状态检索
export function statusSearchBook(status) {
  return request({
    url: '/cadmin/book/status_search',
    method: 'post',
    data: {
      token: store.getters.token,
      status: status
    }
  })
}

//检索
export function searchBookInfo(search_type, search_value) {
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
