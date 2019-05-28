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

    11.班级信息
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

//7.教改项目等级 ProjectRank
export function getProjectRankOptins() {
  return request({
    url: '/cadmin/project_rank_options/get',
    method: 'get',
  })
}

//8.教改项目类型 ProjectType
export function getProjectTypekOptins() {
  return request({
    url: '/cadmin/project_type_options/get',
    method: 'get',
  })
}

//9.教改项目子类型 ProjectChildType
export function getProjectChildTypeOptins() {
  return request({
    url: '/cadmin/project_child_type_options/get',
    method: 'get',
  })
}

//10.大创等级 InnovationRank
export function getInnovationRankOptins() {
  return request({
    url: '/cadmin/innovation_rank_options/get',
    method: 'get',
  })
}

//11. 班级信息选项
export function getClassOptins() {
  return request({
    url: '/cadmin/class_options/get',
    method: 'get',
  })
}

//11. 志愿信息选项
export function getDistributionOptins() {
  return request({
    url: '/cadmin/distribution_options/get',
    method: "post",
    data:{
      token: store.getters.token
    }
  })
}
