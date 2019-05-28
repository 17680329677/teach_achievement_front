import request from '@/utils/request'
import store from "../../store";

/*
*     分流志愿填报状况
* */

//显示所有分流结果
export function getDistributionResult(){
  return request({
    url: "/cadmin/distribution_result/get",
    method: "post",
    data:{
      token: store.getters.token
    }
  })
}

//按  id name 搜索：
//     search_type ;  search_value
export function searchDistributionResult(search_type, search_value){
  return request({
    url: "/cadmin/distribution_result/search",
    method: "post",
    data:{
      search_type: search_type,
      search_value: search_value,
      token: store.getters.token
    }
  })
}

export function searchStatusDistributionResult(status){
  return request({
    url: "/cadmin/distribution_result/search_status",
    method: "post",
    data:{
      status: status,
      token: store.getters.token
    }
  })
}
