import request from '@/utils/request'
import store from "../../store";

/*
*     分流志愿填报状况
* */

//显示所有分流志愿
export function getDistributionDesire(){
  return request({
    url: "/cadmin/distribution_desire/get",
    method: "post",
    data:{
      token: store.getters.token
    }
  })
}

//按是否填报搜索：
//     if_choose : "已填报" / "未填报"
export function statusSearchDistributionDesire(if_choose){
  return request({
    url: "/cadmin/distribution_desire/status_search",
    method: "post",
    data:{
      if_choose: if_choose,
      token: store.getters.token
    }
  })
}

//一键分流
export function distribution(){
  return request({
    url: "/cadmin/distribution_desire/distribute",
    method: "post",
    data:{
      token: store.getters.token
    }
  })
}
