import { request } from './request'
import type {
  LoginParams,
  LoginResponse,
  RegisterParams,
  VerifyCodeType,
  ResetPasswordParams
} from '../models/auth'

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
export async function sendVerifyCode(phone: string, type: VerifyCodeType = 'login'): Promise<void> {
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
export async function resetPassword(params: ResetPasswordParams): Promise<void> {
  return request({
    url: '/api/auth/reset-password',
    method: 'POST',
    data: params,
  })
}
