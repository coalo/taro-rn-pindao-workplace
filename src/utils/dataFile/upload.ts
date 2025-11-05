import Taro from '@tarojs/taro'

/**
 * 与原生 upload 保持同名导出
 */
const upload = {
  async uploadFile(url: string, filePath: string, name: string, formData?: Record<string, any>) {
    return Taro.uploadFile({
      url,
      filePath,
      name,
      formData
    })
  }
}

export default upload
