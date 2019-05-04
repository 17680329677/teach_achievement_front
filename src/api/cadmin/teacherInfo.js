import request from '@/utils/request'
import store from "../../store";

/*
*     当前学院教师信息管理 teacherInfo
* */

//获得本学院所有教师详细信息
export function getAllTeacherInfo(){
  return request({
    url: "/cadmin/teacher_info/get",
    method: "post",
    data:{
      "token": store.getters.token
    }
  })
}

//新添加教师信息
export function addTeacherInfo(number, teacherName, gender, nationality, birth_year_month, college_id, teachertitle_id,
                                  managertitle_id, teacherType, teacherStatus, work_begin_year_month, bjfu_join_year_month,
                                  highest_education,   highest_education_accord_year_month, graduate_paper_title,
                                  graduate_school, research_direction, telephone, email){
  return request({
    url: "/cadmin/teacher_info/add",
    method: "post",
    data:{
      //"token": store.getters.token
      "number": number,
      "name": teacherName,
      "gender": gender,
      "nationality": nationality,
      "birth_year_month": birth_year_month,
      "college_id": college_id,
      "teachertitle_id": teachertitle_id,
      "managertitle_id": managertitle_id,
      "type": teacherType,
      "status": teacherStatus,
      "work_begin_year_month": work_begin_year_month,
      "bjfu_join_year_month": bjfu_join_year_month,
      "highest_education": highest_education,
      "highest_education_accord_year_month": highest_education_accord_year_month,
      "graduate_paper_title": graduate_paper_title,
      "graduate_school": graduate_school,
      "research_direction": research_direction,
      "telephone": telephone,
      "email": email
    }
  })
}


//修改选定的教师信息
export function updateTeacherInfo(number, teacherName, gender, nationality, birth_year_month, department_id, college_id, teachertitle_id,
                                  managertitle_id, teacherType, teacherStatus, work_begin_year_month, bjfu_join_year_month,
                                  highest_education,   highest_education_accord_year_month, graduate_paper_title,
                                  graduate_school, research_direction, telephone, email){
  return request({
    url: "/cadmin/teacher_info/update",
    method: "post",
    data:{
      "number": number,
      //"token": store.getters.token
      "name": teacherName,
      "gender": gender,
      "nationality": nationality,
      "birth_year_month": birth_year_month,
      "department_id": department_id,
      "college_id": college_id,
      "teachertitle_id": teachertitle_id,
      "managertitle_id": managertitle_id,
      "type": teacherType,
      "status": teacherStatus,
      "work_begin_year_month": work_begin_year_month,
      "bjfu_join_year_month": bjfu_join_year_month,
      "highest_education": highest_education,
      "highest_education_accord_year_month": highest_education_accord_year_month,
      "graduate_paper_title": graduate_paper_title,
      "graduate_school": graduate_school,
      "research_direction": research_direction,
      "telephone": telephone,
      "email": email
    }
  })
}

//删除教师账号和信息
export function delTeacherInfo(teacherNumebr){
  return request({
    url: "/cadmin/teacher_info/del",
    method: "post",
    data:{
      //"token": store.getters.token
      number: teacherNumebr
    }
  })
}



