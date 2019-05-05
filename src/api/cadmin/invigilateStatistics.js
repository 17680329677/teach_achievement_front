import request from '@/utils/request'
import store from "../../store";

/*
*     当前学院 监考信息 统计
* */

//获得本学院所有监考信息
export function getInvigilateStatisticsInfo() {
  return request({
    url: '/cadmin/invigilate_statistics/index',
    method: 'post',
    data: {
      token: store.getters.token
    }
  })
}

//获得监考详细信息
export function getDetailInvigilateStatisticsInfo(teacher_number) {
  return request({
    url: '/cadmin/invigilate_statistics/detail',
    method: 'post',
    data: {
      teacher_number: teacher_number
    }
  })
}

//按照时间段 统计监考信息
export function getInvigilateInfoByTimeSection(from_time, to_time) {
  return request({
    url: '/cadmin/invigilate_statistics/time_section',
    method: 'post',
    data: {
      token: store.getters.token,
      from_time: from_time,
      to_time: to_time
    }
  })
}
