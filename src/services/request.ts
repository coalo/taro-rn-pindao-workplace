import Taro from '@tarojs/taro'
import { API_BASE_URL } from '@/constants/api'

/**
 * 请求配置接口
 */
export interface RequestConfig {
  /** 请求地址 */
  url: string
  /** 请求方法 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  /** 请求数据 */
  data?: any
  /** 请求头 */
  header?: Record<string, string>
  /** 超时时间（毫秒） */
  timeout?: number
}

/**
 * 统一响应格式
 */
export interface ApiResponse<T = any> {
  /** 状态码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
}

/**
 * 请求错误类
 */
export class RequestError extends Error {
  code: number
  data?: any

  constructor(message: string, code: number, data?: any) {
    super(message)
    this.name = 'RequestError'
    this.code = code
    this.data = data
  }
}

/**
 * 获取 Token
 * 从本地存储中获取用户 token
 */
function getToken(): string {
  try {
    return Taro.getStorageSync('token') || ''
  } catch (error) {
    console.warn('获取 token 失败:', error)
    return ''
  }
}

/**
 * 统一请求封装
 * 
 * @param config - 请求配置
 * @returns Promise<响应数据>
 * 
 * @example
 * ```typescript
 * // GET 请求
 * const data = await request<UserInfo>({
 *   url: '/api/users/123',
 *   method: 'GET'
 * })
 * 
 * // POST 请求
 * const result = await request<LoginResponse>({
 *   url: '/api/auth/login',
 *   method: 'POST',
 *   data: { username, password }
 * })
 * ```
 */
export async function request<T = any>(config: RequestConfig): Promise<T> {
  const {
    url,
    method = 'GET',
    data,
    header = {},
    timeout = 30000,
  } = config

  // 构造完整的请求地址
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`

  // 获取 token
  const token = getToken()

  // 合并请求头
  const requestHeader: Record<string, string> = {
    'Content-Type': 'application/json',
    ...header,
  }

  // 如果有 token，添加到请求头
  if (token) {
    requestHeader['Authorization'] = `Bearer ${token}`
  }

  try {
    // 发起请求
    const response = await Taro.request({
      url: fullUrl,
      method,
      data,
      header: requestHeader,
      timeout,
    })

    // 检查 HTTP 状态码
    if (response.statusCode !== 200) {
      throw new RequestError(
        `HTTP ${response.statusCode}`,
        response.statusCode,
        response.data
      )
    }

    const result = response.data as ApiResponse<T>

    // 检查业务状态码
    if (result.code !== 0 && result.code !== 200) {
      // 特殊处理：token 过期
      if (result.code === 401) {
        // 清除本地 token
        Taro.removeStorageSync('token')
        
        // 提示用户重新登录
        Taro.showToast({
          title: '登录已过期，请重新登录',
          icon: 'none',
          duration: 2000,
        })

        // 跳转到登录页（根据实际路由调整）
        setTimeout(() => {
          Taro.redirectTo({ url: '/pages/login/index' })
        }, 2000)
      } else {
        // 其他业务错误，显示错误信息
        Taro.showToast({
          title: result.message || '请求失败',
          icon: 'none',
          duration: 2000,
        })
      }

      throw new RequestError(result.message || '请求失败', result.code, result.data)
    }

    // 返回数据
    return result.data
  } catch (error: any) {
    // 网络错误或其他异常
    if (error instanceof RequestError) {
      throw error
    }

    // Taro 请求错误
    const errorMessage = error.errMsg || error.message || '网络请求失败'
    
    console.error('请求异常:', {
      url: fullUrl,
      method,
      error: errorMessage,
    })

    Taro.showToast({
      title: '网络请求失败，请稍后重试',
      icon: 'none',
      duration: 2000,
    })

    throw new RequestError(errorMessage, -1)
  }
}

/**
 * GET 请求快捷方法
 */
export function get<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
  return request<T>({
    url,
    method: 'GET',
    data,
    ...config,
  })
}

/**
 * POST 请求快捷方法
 */
export function post<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
  return request<T>({
    url,
    method: 'POST',
    data,
    ...config,
  })
}

/**
 * PUT 请求快捷方法
 */
export function put<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
  return request<T>({
    url,
    method: 'PUT',
    data,
    ...config,
  })
}

/**
 * DELETE 请求快捷方法
 */
export function del<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
  return request<T>({
    url,
    method: 'DELETE',
    data,
    ...config,
  })
}

/**
 * 上传文件
 * 
 * @param url - 上传地址
 * @param filePath - 文件路径
 * @param name - 文件对应的 key
 * @param formData - 其他表单数据
 */
export async function uploadFile(
  url: string,
  filePath: string,
  name: string = 'file',
  formData?: Record<string, any>
): Promise<any> {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`
  const token = getToken()

  try {
    const response = await Taro.uploadFile({
      url: fullUrl,
      filePath,
      name,
      formData,
      header: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })

    if (response.statusCode !== 200) {
      throw new RequestError(`上传失败: HTTP ${response.statusCode}`, response.statusCode)
    }

    const result = JSON.parse(response.data) as ApiResponse

    if (result.code !== 0 && result.code !== 200) {
      throw new RequestError(result.message || '上传失败', result.code)
    }

    return result.data
  } catch (error: any) {
    console.error('文件上传失败:', error)
    throw error instanceof RequestError ? error : new RequestError(error.message, -1)
  }
}
