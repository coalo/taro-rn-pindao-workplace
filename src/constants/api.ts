/**
 * API 相关常量定义
 */

// ==================== API 配置 ====================
export const API_CONFIG = {
  // 从环境变量中读取，由 Taro 构建时注入
  BASE_URL: process.env.API_BASE_URL || 'https://api.example.com',
  TIMEOUT: process.env.API_TIMEOUT || 10000,
  RETRY_TIMES: 3,
  RETRY_DELAY: 1000,
}

// API 基础地址（为 services 层提供）
export const API_BASE_URL = API_CONFIG.BASE_URL

// ==================== HTTP 状态码 ====================
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 408,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
}

// ==================== 业务状态码 ====================
export const BUSINESS_CODE = {
  SUCCESS: 0,
  FAILED: -1,
  TOKEN_EXPIRED: 10001,
  TOKEN_INVALID: 10002,
  PERMISSION_DENIED: 10003,
  PARAM_ERROR: 10004,
  SYSTEM_ERROR: 10005,
}

// ==================== API 端点 ====================
export const API_ENDPOINTS = {
  // 用户相关
  USER_LOGIN: '/user/login',
  USER_LOGOUT: '/user/logout',
  USER_INFO: '/user/info',
  USER_UPDATE: '/user/update',
  
  // 任务相关
  TASK_LIST: '/task/list',
  TASK_DETAIL: '/task/detail',
  TASK_CREATE: '/task/create',
  TASK_UPDATE: '/task/update',
  TASK_DELETE: '/task/delete',
}

// ==================== 请求方法 ====================
export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
}

// ==================== 请求头 ====================
export const REQUEST_HEADERS = {
  CONTENT_TYPE_JSON: 'application/json',
  CONTENT_TYPE_FORM: 'application/x-www-form-urlencoded',
  CONTENT_TYPE_MULTIPART: 'multipart/form-data',
}
