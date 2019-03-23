import request from '@/utils/request'

/*
*     教改项目等级配置 ProjectRank
* */

//获取教改项目等级信息
export function projectRankGet() {
  return request({
    url: '/sadmin/project_rank/get',
    method: 'get'
  })
}

//添加 教改项目等级 配置
export function projectRankAdd(rank_name) {
  return request({
    url: '/sadmin/project_rank/add',
    method: 'post',
    data: {
      rank_name: rank_name
    }
  })
}

//删除 教改项目等级 配置
export function projectRankDelete(id) {
  return request({
    url: '/sadmin/project_rank/del',
    method: 'post',
    data: {
      id: id
    }
  })
}

//更新 教改项目等级 配置
export function projectRankUpdate(id, rank_name) {
  return request({
    url: '/sadmin/project_rank/update',
    method: 'post',
    data: {
      id: id,
      rank_name: rank_name
    }
  })
}

