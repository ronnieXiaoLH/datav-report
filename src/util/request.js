import axios from 'axios'

const service = axios.create({
  baseURL: 'https://apis.imooc.com', // 慕课地址
  // baseURL: '/api', // 本地api地址
  timeout: 5000
})

service.interceptors.response.use(response => {
  if (response.status === 200 && response.data) {
    return response.data
  } else {
    return Promise.reject(new Error('请求失败'))
  }
}, error => {
  return Promise.reject(error.message)
})

export default service
