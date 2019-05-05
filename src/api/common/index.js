import request from '@/utils/request'

export function deleteFile(file_name) {
  return request({
    url: '/common/delete_file',
    method: 'post',
    data: {
      file_name: file_name
    }
  })
}
