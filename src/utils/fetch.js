import axios from 'axios'
import {Loading, Message} from 'element-ui'
const domainMBA = 'http://n.mba.baidu.com'

// create axios instance
const service = axios.create({
  baseURL: domainMBA, // api的base_url
  timeout: 50000
})
let loadingInstance

// request拦截器，实现loading加载
service.interceptors.request.use(config => {
  loadingInstance = Loading.service({})
  return config
}, error => {
  loadingInstance.close()
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

// response拦截器，实现loading关闭
service.interceptors.response.use(data => {
  loadingInstance.close()
  return data
}, error => {
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
