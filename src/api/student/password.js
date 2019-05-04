import request from '@/utils/request'
import store from "../../store";

export function passwordUpdate(oldPasword, newPassword) {
  return request({
    url: '/student/password/update',
    method: 'post',
    data: {
      token:store.getters.token,
      oldPasword: oldPasword,
      newPassword: newPassword
    }
  })
}
