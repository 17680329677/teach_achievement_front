import request from '@/utils/request'
import store from "../../store";

/*
 选项信息获取
    1.学生所在学院分流方向获取
*/

//1.学生所在学院分流方向获取
export function getDistributionOptions(){
  return request({
    url: "/student/distribution_options/get",
    method: "post",
    data: {
      token:store.getters.token,
    }

  })
}
