/**
 * 与原生 hostMap 保持同名导出
 * 注意：小程序环境无 process.env，需通过构建时注入或使用默认值
 */

// 安全获取环境变量（兼容小程序等无 process 环境）
const getEnv = (key: string, defaultValue: string): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue
  }
  return defaultValue
}

const hostMap = {
  API_HOST: getEnv('API_BASE_URL', 'https://api.example.com'),
  IMG_HOST: getEnv('IMG_BASE_URL', 'https://img.example.com'),
  H5_HOST: getEnv('H5_BASE_URL', 'https://h5.example.com')
}

export default hostMap
