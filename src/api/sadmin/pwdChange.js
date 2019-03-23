import request from '@/utils/request'
import store from "../../store";

export function passwordUpdate(oldPasword, newPassword) {
  return request({
    url: '/sadmin/password/update',
    method: 'post',
    data: {
      number:store.getters.token,
      oldPasword: oldPasword,
      newPassword: newPassword
    }
  })
}
