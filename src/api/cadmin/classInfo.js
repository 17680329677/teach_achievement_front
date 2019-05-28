import request from '@/utils/request'
import store from "../../store";

/*
*     班级配置
* */

//显示班级
export function getClassInfo(){
  return request({
    url: "/cadmin/class_info/get",
    method: "post",
    data:{
      token: store.getters.token
    }
  })
}


//添加
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


//删除
export function delClassInfo(){
  return request({
    url: "/cadmin/class_info/del",
    method: "post",
    data:{
      id: id,
    }
  })
}
