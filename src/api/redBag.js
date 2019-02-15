import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/Main/redEnvelopesList',
    method: 'get',
    params
  })
}

/**
 * 获取红包信息
 */
export function getDetail(params) {
  return request({
    url: '/Main/redEnvelopesInfo',
    method: 'get',
    params
  })
}
