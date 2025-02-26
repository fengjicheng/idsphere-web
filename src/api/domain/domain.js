import request from '@/utils/request'

// 新增域名服务商
export function addDomainServiceProvider(data) {
  return request({
    url: '/api/v1/domain/provider',
    method: 'post',
    data
  })
}

// 删除域名服务商
export function deleteDomainServiceProvider(data) {
  return request({
    url: '/api/v1/domain/provider/' + data.id,
    method: 'delete'
  })
}

// 修改站点分组
export function changeDomainServiceProvider(data) {
  return request({
    url: '/api/v1/domain/provider',
    method: 'put',
    data
  })
}

// 获取域名服务商列表
export function getDomainServiceProviderList() {
  return request({
    url: '/api/v1/domain/providers',
    method: 'get'
  })
}
