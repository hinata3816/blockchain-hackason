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
export function addProject(params) {
  return request({
    url: '/Project/addProject',
    method: 'get',
    params
  })
}

/**
 * 获取用户列表
 */
export function getUserList() {
  return request({
    url: '/User/selectInvestigator',
    method: 'get'
  })
}

/**
 * ファイル追加
 */
export function addFile(params) {
  return request({
    url: '/Project/operateHash',
    method: 'get',
    params
  })
}

/**
 * 验证项目的key
 */
export function verifyKey(params) {
  return request({
    url: '/Project/verifyKey',
    method: 'get',
    params
  })
}

/**
 * 获取用户列表
 */
export function resourcesList(params) {
  return request({
    url: '/Project/resourcesList',
    method: 'get',
    params
  })
}

/**
 * 公开项目
 */
export function projectPublic(params) {
  return request({
    url: '/Project/projectPublic',
    method: 'get',
    params
  })
}
