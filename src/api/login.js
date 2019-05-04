import request from '@/utils/request'

//负责检查账号和密码是否正确
// params： username, password, type
// return:  token (token就是教师工号或学生学号)
export function login(username, password, type) {
  return request({
    url: '/login/index',
    method: 'post',
    data: {
      'username': username,
      'password': password,
      'type': type,
    }
  })
}

// 获取用户详细信息
// params：token
// return：头像图片、姓名、工号或学号、权限组 详细信息（avatar、name、number、roles、sadmin）
export function getInfo(token,type) {
  return request({
    url: '/login/getinfo',
    method: 'post',
    data: {
      'token': token,
      'type':type
    }
  })
}

//退出登录
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
