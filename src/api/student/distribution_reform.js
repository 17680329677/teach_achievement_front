import request from '@/utils/request'
import store from "../../store";

export function getDistributionResult() {
  return request({
    url: '/student/student_info/get',
    method: 'post',
    data: {
      token:store.getters.token,
    }
  })
}
