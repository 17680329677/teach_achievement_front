import request from '@/utils/request'
import store from '../../store'

//基本信息
export function getAllBookInfo() {
  return request({
    url: '/normal/book/index',
    method: 'post',
    data: {
      number: store.getters.token
    }
  })
}

//详细信息
export function getDetailBookInfo(id) {
  return request({
    url: '/normal/book/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

//新增item
export function createItemInfo(book_name, book_number,order, publish_time, pages, words, isbn, press, version, style, rank_id, project, cover_path, copy_path, content_path, authors) {
  return request({
    url: '/normal/book/create',
    method: 'post',
    data: {
      book_name: book_name,
      book_number: book_number,
      order:order,
      publish_time: publish_time,
      pages: pages,
      words: words,
      isbn: isbn,
      press: press,
      version: version,
      style: style,
      rank_id: rank_id,
      project: project,
      cover_path: cover_path,
      copy_path: copy_path,
      content_path: content_path,
      authors: authors,
      token: store.getters.token
    }
  })
}

//改变状态
export function changeBookStatus(id,status) {
  return request({
    url: '/normal/book/changestatus',
    method: 'post',
    data: {
      id: id,
      status: status
    }
  })
}

//修改信息
export function changeSubmitInfo(id, book_name, book_number, order, publish_time, pages, words, isbn, press,
                                 version, style, rank_id, college, project, cover_path,
                                 copy_path, content_path, authors) {
  return request({
    url: '/normal/book/submitInfo/change',
    method: 'post',
    data: {
      id: id,
      book_name: book_name,
      book_number: book_number,
      order:order,
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
      cover_path: cover_path,
      copy_path: copy_path,
      content_path: content_path,
      authors: authors,
      token: store.getters.token
    }
  })
}

//删除书籍
export function deleteBookInfo(id) {
  return request({
    url: '/normal/book/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function searchBookInfo(search_type, search_value) {
  return request({
    url: '/normal/book/search',
    method: 'post',
    data: {
      number: store.getters.token,
      search_type: search_type,
      search_value: search_value
    }
  })
}
