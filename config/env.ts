/**
 * 环境变量统一导出
 * 根据 NODE_ENV 自动选择对应的环境配置
 */

import type { EnvConfig } from './env.dev'

// 动态导入对应环境的配置
const isDev = process.env.NODE_ENV === 'development'

// 根据环境加载配置
let envConfig: EnvConfig

if (isDev) {
  envConfig = require('./env.dev').ENV_CONFIG
} else {
  envConfig = require('./env.prod').ENV_CONFIG
}

/**
 * 当前环境配置
 * 在应用中通过此变量访问环境配置
 * 
 * @example
 * ```typescript
 * import { ENV } from '@/config/env'
 * 
 * console.log(ENV.API_BASE_URL)
 * console.log(ENV.DEBUG)
 * ```
 */
export const ENV = envConfig

/**
 * 判断是否为开发环境
 */
export const isDevelopment = process.env.NODE_ENV === 'development'

/**
 * 判断是否为生产环境
 */
export const isProduction = process.env.NODE_ENV === 'production'

/**
 * 判断当前平台
 */
export const PLATFORM = process.env.TARO_ENV || 'unknown'

/**
 * 判断是否为特定平台
 */
export const isWeapp = PLATFORM === 'weapp'
export const isH5 = PLATFORM === 'h5'
export const isRN = PLATFORM === 'rn'
export const isAlipay = PLATFORM === 'alipay'
export const isSwan = PLATFORM === 'swan'
export const isTt = PLATFORM === 'tt'
