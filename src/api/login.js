import request from '@/utils/request'

/**
 * 登录
 */
export function login(loginName, password) {
  return request({
    url: '/Main/login',
    method: 'post',
    data: {
      loginName,
      password,
      admin: 1
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/Main/logout',
    method: 'post'
  })
}
