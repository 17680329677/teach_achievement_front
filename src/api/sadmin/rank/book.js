import request from '@/utils/request'

export function getBookRankInfo() {
  return request({
    url: '/sadmin/bookrank/index',
    method: 'get',
  })
}

export function updateBookRankInfo(id, rank_name) {
  return request({
    url: '/sadmin/bookrank/update',
    method: 'post',
    data: {
      id: id,
      rank_name: rank_name
    }
  })
}

export function addBookRankInfo(rank_name) {
  return request({
    url: '/sadmin/bookrank/add',
    method: 'post',
    data: {
      rank_name: rank_name
    }
  })
}

export function deleteBookRankInfo(id) {
  return request({
    url: '/sadmin/bookrank/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}
