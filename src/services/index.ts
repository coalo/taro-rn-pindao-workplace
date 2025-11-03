/**
 * Services 统一导出
 */

// 导出请求工具
export { request, get, post, put, del, uploadFile } from './request'
export type { RequestConfig, ApiResponse, RequestError } from './request'

// 导出认证服务
export {
  login,
  logout,
  register,
  refreshToken,
  sendVerifyCode,
  resetPassword,
} from './auth'
export type { LoginParams, LoginResponse, RegisterParams } from './auth'

// 导出用户服务
export {
  getCurrentUser,
  getUserInfo,
  updateUserProfile,
  changePassword,
  uploadAvatar,
  getUserList,
} from './user'
export type { UserInfo, UpdateUserParams, ChangePasswordParams } from './user'
