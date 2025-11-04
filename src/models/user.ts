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
 * 用户列表查询参数
 */
export interface UserListParams {
  page?: number
  pageSize?: number
  keyword?: string
}

/**
 * 用户列表响应
 */
export interface UserListResponse {
  list: UserInfo[]
  total: number
  page: number
  pageSize: number
}
