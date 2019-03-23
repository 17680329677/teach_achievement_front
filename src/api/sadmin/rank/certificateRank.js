import request from '@/utils/request'

/*
*     证书等级列表 CertificateRank
* */

//获取证书等级信息
export function certificateRankGet() {
  return request({
    url: '/sadmin/certificate_rank/index',
    method: 'get'
  })
}

//添加证书等级配置
export function certificateRankAdd(rank_name) {
  return request({
    url: '/sadmin/certificate_rank/add',
    method: 'post',
    data: {
      rank_name: rank_name
    }
  })
}

//删除证书等级配置
export function certificateRankDelete(id) {
  return request({
    url: '/sadmin/certificate_rank/del',
    method: 'post',
    data: {
      id: id
    }
  })
}

//更新证书等级配置
export function certificateRankUpdate(id, rank_name) {
  return request({
    url: '/sadmin/certificate_rank/update',
    method: 'post',
    data: {
      id: id,
      rank_name: rank_name
    }
  })
}

