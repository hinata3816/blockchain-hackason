import request from '@/utils/request'

/**
 * 登录
 */
export function login(loginName, password) {
  return request({
    url: '/User/login',
    method: 'post',
    data: {
      loginName,
      password
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
    url: '/User/logout',
    method: 'post'
  })
}
