import type { UserConfigExport } from "@tarojs/cli";
import { ENV_CONFIG } from './env.dev'

export default {
  logger: {
    quiet: false,
    stats: true
  },
  // 注入环境变量到应用中
  defineConstants: {
    'process.env.API_BASE_URL': JSON.stringify(ENV_CONFIG.API_BASE_URL),
    'process.env.API_TIMEOUT': JSON.stringify(ENV_CONFIG.API_TIMEOUT),
    'process.env.DEBUG': JSON.stringify(ENV_CONFIG.DEBUG),
    'process.env.ENABLE_MOCK': JSON.stringify(ENV_CONFIG.ENABLE_MOCK),
    'process.env.LOG_LEVEL': JSON.stringify(ENV_CONFIG.LOG_LEVEL),
    'process.env.CDN_URL': JSON.stringify(ENV_CONFIG.CDN_URL),
    'process.env.WS_URL': JSON.stringify(ENV_CONFIG.WS_URL),
  },
  mini: {},
  h5: {}
} satisfies UserConfigExport<'webpack5'>
