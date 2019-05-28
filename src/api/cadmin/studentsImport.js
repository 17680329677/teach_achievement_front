import request from '@/utils/request'
import store from "../../store";

/*
*     信息导入
* */

//显示学生
export function getStudentInfo(){
  return request({
    url: "/cadmin/students_info/get",
    method: "post",
    data:{
      token: store.getters.token
    }
  })
}


//添加
/*
export function addClassInfo(class_name, grade, status){
  return request({
    url: "/cadmin/class_info/add",
    method: "post",
    data:{
      class_name: class_name, //班级名称
      grade: grade, //年级
      status: status,//状态（有效无效的标志）
      token: store.getters.token,
    }
  })
}
*/
