import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/Main/userlist',
    method: 'get',
    params
  })
}
