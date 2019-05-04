const getters = {
  //app:
  sidebar: state => state.app.sidebar, //方法名随意,主要是来承载变化的sidebar的值
  device: state => state.app.device,  //？？？

  //user：
  token: state => state.user.token,   //token，值为教工号或学生学号
  avatar: state => state.user.avatar, //用户头像地址
  name: state => state.user.name,     //用户姓名
  roles: state => state.user.roles,   //用户权限数组，有可能是教师带有多个权限
  type: state => state.user.type,     //用户类型：teacher/student

  //permission：
  permission_routers: state => state.permission.routers,  //？？？
  addRouters: state => state.permission.addRouters        //？？？
}
export default getters
