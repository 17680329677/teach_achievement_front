import request from '@/utils/request'

/*
*     大创等级配置 Innovation Rank
* */

//获取 大创等级配置 信息
export function innovationRankGet() {
  return request({
    url: '/sadmin/innovation_rank/get',
    method: 'get'
  })
}

//添加 大创等级配置 配置
export function innovationRankAdd(rank_name) {
  return request({
    url: '/sadmin/innovation_rank/add',
    method: 'post',
    data: {
      rank_name: rank_name
    }
  })
}

//删除 大创等级配置 配置
export function innovationRankDelete(id) {
  return request({
    url: '/sadmin/innovation_rank/del',
    method: 'post',
    data: {
      id: id
    }
  })
}

//更新 大创等级配置 配置
export function innovationRankUpdate(id, rank_name) {
  return request({
    url: '/sadmin/innovation_rank/update',
    method: 'post',
    data: {
      id: id,
      rank_name: rank_name
    }
  })
}

