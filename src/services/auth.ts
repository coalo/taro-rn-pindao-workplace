import { request } from './request'

/**
 * 登录参数
 */
export interface LoginParams {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
}

/**
 * 登录响应
 */
export interface LoginResponse {
  /** 访问令牌 */
  token: string
  /** 刷新令牌 */
  refreshToken?: string
  /** 用户信息 */
  userInfo: {
    id: string
    username: string
    nickname: string
    avatar?: string
    email?: string
    phone?: string
  }
}

/**
 * 注册参数
 */
export interface RegisterParams {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 确认密码 */
  confirmPassword: string
  /** 邮箱（可选） */
  email?: string
  /** 手机号（可选） */
  phone?: string
}

/**
 * 用户登录
 * 
 * @param params - 登录参数
 * @returns 登录响应数据
 */
export async function login(params: LoginParams): Promise<LoginResponse> {
  return request<LoginResponse>({
    url: '/api/auth/login',
    method: 'POST',
    data: params,
  })
}

/**
 * 用户登出
 */
export async function logout(): Promise<void> {
  return request({
    url: '/api/auth/logout',
    method: 'POST',
  })
}

/**
 * 用户注册
 * 
 * @param params - 注册参数
 * @returns 注册响应数据
 */
export async function register(params: RegisterParams): Promise<LoginResponse> {
  return request<LoginResponse>({
    url: '/api/auth/register',
    method: 'POST',
    data: params,
  })
}

/**
 * 刷新 Token
 * 
 * @param refreshToken - 刷新令牌
 * @returns 新的 token
 */
export async function refreshToken(refreshToken: string): Promise<{ token: string }> {
  return request({
    url: '/api/auth/refresh',
    method: 'POST',
    data: { refreshToken },
  })
}

/**
 * 发送验证码
 * 
 * @param phone - 手机号
 * @param type - 验证码类型（login | register | reset）
 */
export async function sendVerifyCode(phone: string, type: 'login' | 'register' | 'reset' = 'login'): Promise<void> {
  return request({
    url: '/api/auth/send-code',
    method: 'POST',
    data: { phone, type },
  })
}

/**
 * 重置密码
 * 
 * @param params - 重置密码参数
 */
export async function resetPassword(params: {
  phone: string
  code: string
  newPassword: string
}): Promise<void> {
  return request({
    url: '/api/auth/reset-password',
    method: 'POST',
    data: params,
  })
}
