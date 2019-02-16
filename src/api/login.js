import request from '@/utils/request'

/**
 * ログイン
 */
export function login(loginName, password) {
  return request({
    url: '/User/login',
    method: 'get',
    params: {
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
 * ログアウト
 */
export function logout() {
  return request({
    url: '/User/logout',
    method: 'get'
  })
}
