import request from '@/utils/request'
//获取项目信息
export function getList(params) {
  return request({
    url: '/Main/redEnvelopesList',
    method: 'get',
    params
  })
}

/**
 * 添加项目
 */
export function getDetail(params) {
  return request({
    url: '/Main/redEnvelopesInfo',
    method: 'get',
    params
  })
}
