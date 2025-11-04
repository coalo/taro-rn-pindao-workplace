import { request } from './request'
import type {
  UserInfo,
  UpdateUserParams,
  ChangePasswordParams,
  UserListParams,
  UserListResponse
} from '../models/user'

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
export async function getUserList(params: UserListParams): Promise<UserListResponse> {
  return request({
    url: '/api/users',
    method: 'GET',
    data: params,
  })
}
