import request from '@/utils/request'
import store from "../../store";

export function getStudentInfo() {
  return request({
    url: '/student/student_info/get',
    method: 'post',
    data: {
      token:store.getters.token,
    }
  })
}

export function getDistributionDesire() {
  return request({
    url: '/student/distribution_desire/get',
    method: 'post',
    data: {
      token:store.getters.token,
    }
  })
}

export function addDistributionDesire(distribution_id,rank) {
  return request({
    url: '/student/distribution_desire/add',
    method: 'post',
    data: {
      token:store.getters.token,
      distribution_id: distribution_id,
      desire_rank: rank,
    }
  })
}
