import Taro from '@tarojs/taro'

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  data?: any
}

/**
 * 与原生小程序 request 对齐的最小实现
 */
const request = async (api: string, data: any = {}, options: RequestOptions = {}) => {
  const method = options.method || 'POST'
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  const baseURL = process.env.API_BASE_URL || 'https://api.example.com'
  const url = api.startsWith('http') ? api : `${baseURL}${api}`

  const res = await Taro.request({
    url,
    method,
    data,
    header: headers,
    timeout: Number(process.env.API_TIMEOUT) || 10000
  })

  const payload = (res as any).data
  return payload?.data !== undefined ? payload : payload
}

export default request
