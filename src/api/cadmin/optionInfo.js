import request from '@/utils/request'
import store from "../../store";

/*
 选项信息获取
    1.学院
    2.教研室
    3.教师职称
    4.学院教师信息【id+name+department_id】
    5.教研室教师信息【id+name+department_id】
    6.教材等级选项
*/

//1.挂载 学院选项信息
export function getCollegeOptions(){
  return request({
    url: "/cadmin/college_options/get",
    method: "get",
  })
}

//2.挂载 教研室选项信息
export function getDepartmentOptions(){
  return request({
    url: "/cadmin/department_options/get",
    method: "get",
  })
}

//3.挂载 教师职称选项
export function getTeacherTitleOption() {
  return request({
    url: '/cadmin/teacher_title_option/get',
    method: 'post',
  })
}

//4.获取 本学院 教师信息选项 工号+姓名
export function getTeacherOptions(){
  return request({
    url:"/cadmin/teacher_info_number_name/get",
    method: "post",
    data:{
      "token": store.getters.token
    }
  })
}

//5.获取 本教研室 教师信息 工号+姓名
export function getTeachersInfoByDepartmentId(department_id){
  return request({
    url:"/cadmin/teacher_info_number_name/get_by_department_id",
    method: "post",
    data:{
      "department_id": department_id
    }
  })
}

//6. 教材等级选项
export function getBookRankOptins() {
  return request({
    url: '/cadmin/book_rank_options/get',
    method: 'get',
  })
}



