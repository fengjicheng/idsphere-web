import request from '@/utils/request'

// 新增集群
export function addCluster(data) {
  return request({
    url: '/api/v1/cluster',
    method: 'post',
    data
  })
}

// 删除集群
export function deleteCluster(data) {
  return request({
    url: '/api/v1/cluster/' + data.id,
    method: 'delete'
  })
}

// 修改集群信息
export function changeCluster(data) {
  return request({
    url: '/api/v1/cluster',
    method: 'put',
    data
  })
}

// 获取集群列表
export function getKubernetesList(params) {
  return request({
    url: '/api/v1/clusters',
    method: 'get',
    params
  })
}
