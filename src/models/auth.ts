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
 * 验证码类型
 */
export type VerifyCodeType = 'login' | 'register' | 'reset'

/**
 * 重置密码参数
 */
export interface ResetPasswordParams {
  phone: string
  code: string
  newPassword: string
}
