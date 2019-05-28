import request from '@/utils/request'
import store from "../../store";

/*
*     分流志愿配置
* */

//显示班级
export function getDistributionInfo(){
  return request({
    url: "/cadmin/distribution_info/get",
    method: "post",
    data:{
      token: store.getters.token
    }
  })
}


//添加
export function addDistributionInfo(orientation_name, num_limit, start_time, end_time){
  return request({
    url: "/cadmin/distribution_info/add",
    method: "post",
    data:{
      orientation_name: orientation_name,
      num_limit: num_limit,
      start_time: start_time,
      end_time: end_time,
      token: store.getters.token,
    }
  })
}

//修改
export function updateDistributionInfo(id, orientation_name, num_limit, start_time, end_time){
  return request({
    url: "/cadmin/distribution_info/update",
    method: "post",
    data:{
      id: id,
      orientation_name: orientation_name,
      num_limit: num_limit,
      start_time: start_time,
      end_time: end_time,
    }
  })
}


//删除
export function delDistributionInfo(){
  return request({
    url: "/cadmin/distribution_info/del",
    method: "post",
    data:{
      id: id,
    }
  })
}
