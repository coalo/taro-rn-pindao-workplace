/**
 * 生产环境变量配置
 */

export const ENV_CONFIG = {
  /** 环境名称 */
  ENV_NAME: 'production',
  
  /** API 基础地址 */
  API_BASE_URL: 'https://api.example.com',
  
  /** API 超时时间（毫秒） */
  API_TIMEOUT: 15000,
  
  /** 是否启用调试模式 */
  DEBUG: false,
  
  /** 是否启用 Mock 数据 */
  ENABLE_MOCK: false,
  
  /** 日志级别 */
  LOG_LEVEL: 'error',
  
  /** CDN 地址 */
  CDN_URL: 'https://cdn.example.com',
  
  /** WebSocket 地址 */
  WS_URL: 'wss://ws.example.com',
  
  /** 静态资源版本号 */
  ASSET_VERSION: '1.0.0',
} as const

export type EnvConfig = typeof ENV_CONFIG
