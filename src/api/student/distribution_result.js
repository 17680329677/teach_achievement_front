import request from '@/utils/request'
import store from "../../store";

export function getDistributionResult() {
  return request({
    url: '/student/distribution_result/get',
    method: 'post',
    data: {
      token:store.getters.token,
    }
  })
}

export function confirmDistributionResult(password,repassword) {
  return request({
    url: '/student/distribution_result/confirm',
    method: 'post',
    data: {
      password: password,
      repassword: repassword,
      token:store.getters.token,
    }
  })
}
