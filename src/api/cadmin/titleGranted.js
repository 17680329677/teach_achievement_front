import request from '@/utils/request'
import store from "../../store";

/*
*     当前学院教师信息管理 teacherInfo
* */

//获得本学院所有教师详细信息
export function getTitleGrantedInfo(){
  return request({
    url: "/cadmin/title_granted/get",
    method: "post",
    data:{
      "token": store.getters.token
    }
  })
}


//授予教师职称
export function grantTitleToTeacher(number, titleType, titleId, dateTime){
  return request({
    url: "/cadmin/teacher_title/grant",
    method: "post",
    data:{
      "number": number,
      "title_type": titleType,
      "title_id": titleId,
      "datetime": dateTime
    }
  })
}
