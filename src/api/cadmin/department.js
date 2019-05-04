import request from '@/utils/request'
import store from "../../store";

/*
*     教研室配置 Department
* */

//获得所有教研室信息
export function getDepatmentInfo(){
  return request({
    url: "/cadmin/department/get",
    method: "post",
    data:{
      "token": store.getters.token
    }
  })
}

//添加教研室
export function departmentAdd(name,director){
  return request({
    url: "/cadmin/department/add",
    method: "post",
    data:{
      "token": store.getters.token,
      "name": name,
      "director": director
    }
  })
}

//给教研室添加教师
export function departmentAddTeacher(department_id,number){
  return request({
    url: "/cadmin/department/add_teacher",
    method: "post",
    data:{
      "department_id": department_id,
      "number": number
    }
  })
}

//从教研室中删除教师
export function departmentDeleteTeacher(number){
  return request({
    url: "/cadmin/department/del_teacher",
    method: "post",
    data:{
      "number": number  //教师工号
    }
  })
}


//修改教研室信息
export function departmentUpdate(id,name,director){
  return request({
    url: "/cadmin/department/update",
    method: "post",
    data:{
      "id": id, //教研室id
      "name": name,
      "director": director
    }
  })
}

//删除教研室信息
export function departmentDelete(id){
  return request({
    url: "/cadmin/department/del",
    method: "post",
    data:{
      "id": id
    }
  })
}



