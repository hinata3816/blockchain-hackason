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
export function addProject(data) {
  return request({
    url: '/Project/addProject',
    method: 'post',
    data
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
 * 添加文件
 */
export function addFile(data) {
  return request({
    url: '/Project/operateHash',
    method: 'post',
    data
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
export function projectPublic(data) {
  return request({
    url: '/Project/projectPublic',
    method: 'post',
    data
  })
}
