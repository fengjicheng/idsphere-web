import request from '@/utils/request'

// 获取所有配置
export function getSettings() {
  return request({
    url: '/api/v1/settings',
    method: 'get'
  })
}

// 获取 Logo
export function getLogo() {
  return request({
    url: '/api/v1/settings/logo',
    method: 'get'
  })
}

// 修改配置
export function updateSettings(data) {
  return request({
    url: '/api/v1/settings',
    method: 'put',
    data
  })
}
