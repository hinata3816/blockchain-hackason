import request from '@/utils/request'

// 获取项目信息
export function getList(params) {
  return request({
    url: '/Project/projectList',
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

/**
 * 获取用户列表
 */
export function getUserList(params) {
  return request({
    url: '/Main/redEnvelopesInfo',
    method: 'get',
    params
  })
}

/**
 * 添加文件
 */
export function addFile(data) {
  return request({
    url: '/Project/operateHash',
    method: 'post',
    data
  })
}
