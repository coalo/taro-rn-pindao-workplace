import { request } from './request'

/**
 * 用户信息
 */
export interface UserInfo {
  /** 用户ID */
  id: string
  /** 用户名 */
  username: string
  /** 昵称 */
  nickname: string
  /** 头像 */
  avatar?: string
  /** 邮箱 */
  email?: string
  /** 手机号 */
  phone?: string
  /** 性别 */
  gender?: 'male' | 'female' | 'unknown'
  /** 生日 */
  birthday?: string
  /** 个人简介 */
  bio?: string
  /** 创建时间 */
  createdAt?: string
  /** 更新时间 */
  updatedAt?: string
}

/**
 * 更新用户资料参数
 */
export interface UpdateUserParams {
  /** 昵称 */
  nickname?: string
  /** 头像 */
  avatar?: string
  /** 邮箱 */
  email?: string
  /** 手机号 */
  phone?: string
  /** 性别 */
  gender?: 'male' | 'female' | 'unknown'
  /** 生日 */
  birthday?: string
  /** 个人简介 */
  bio?: string
}

/**
 * 修改密码参数
 */
export interface ChangePasswordParams {
  /** 旧密码 */
  oldPassword: string
  /** 新密码 */
  newPassword: string
  /** 确认新密码 */
  confirmPassword: string
}

/**
 * 获取当前用户信息
 * 
 * @returns 用户信息
 */
export async function getCurrentUser(): Promise<UserInfo> {
  return request<UserInfo>({
    url: '/api/user/current',
    method: 'GET',
  })
}

/**
 * 获取指定用户信息
 * 
 * @param userId - 用户ID
 * @returns 用户信息
 */
export async function getUserInfo(userId: string): Promise<UserInfo> {
  return request<UserInfo>({
    url: `/api/users/${userId}`,
    method: 'GET',
  })
}

/**
 * 更新用户资料
 * 
 * @param params - 更新参数
 * @returns 更新后的用户信息
 */
export async function updateUserProfile(params: UpdateUserParams): Promise<UserInfo> {
  return request<UserInfo>({
    url: '/api/user/profile',
    method: 'PUT',
    data: params,
  })
}

/**
 * 修改密码
 * 
 * @param params - 修改密码参数
 */
export async function changePassword(params: ChangePasswordParams): Promise<void> {
  return request({
    url: '/api/user/change-password',
    method: 'POST',
    data: params,
  })
}

/**
 * 上传头像
 * 
 * @param filePath - 文件路径
 * @returns 头像 URL
 */
export async function uploadAvatar(filePath: string): Promise<{ url: string }> {
  return request({
    url: '/api/user/upload-avatar',
    method: 'POST',
    data: { filePath },
  })
}

/**
 * 获取用户列表（分页）
 * 
 * @param params - 查询参数
 * @returns 用户列表
 */
export async function getUserList(params: {
  page?: number
  pageSize?: number
  keyword?: string
}): Promise<{
  list: UserInfo[]
  total: number
  page: number
  pageSize: number
}> {
  return request({
    url: '/api/users',
    method: 'GET',
    data: params,
  })
}
