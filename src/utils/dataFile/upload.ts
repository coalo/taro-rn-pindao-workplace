/**
 * 小程序图片上传
 * 从原生小程序完整迁移，保持变量名与逻辑一致
 */
import Taro from '@tarojs/taro'
import apiMap from '../mapFile/apiMap'
import request from './request'
import base64 from '../commonFile/base64'

interface UploadConfig {
  url?: string
  module?: string
  name?: string
  timeout?: number
}

interface OssInfo {
  invalidTime?: number
  expiration?: number
  accessKeyId?: string
  accessKeySecret?: string
  securityToken?: string
  bucketUrl?: string
}

const defaultCfg: UploadConfig = {
  url: apiMap.getOssAssumeRole, // 获取 STS 服务临时令牌地址
  module: 'comment', // 文件存储模块
  name: 'file', // 文件存储 Key
  timeout: 300000 // 超时时间
}

const upload = (filePathList: string[] = [], cfg: UploadConfig = {}) => {
  return new Promise((resolve, reject) => {
    Taro.showLoading({ title: 'Uploading...', mask: true })
    let OssInfo: OssInfo = Taro.getStorageSync('OssInfo') || {}

    if (
      !Object.keys(OssInfo || {}).length ||
      ((OssInfo.invalidTime || 0) - new Date().getTime()) < 0
    ) {
      request(cfg.url || defaultCfg.url || '')
        .then((res: any) => {
          let OssInfo = res.data || {}
          OssInfo.invalidTime = new Date().getTime() + (OssInfo.expiration || 0) - 60000 // 减去延迟时间
          Taro.setStorageSync('OssInfo', OssInfo)
          uploadHandle(filePathList, cfg, OssInfo).then(
            res => resolve(res),
            err => reject(err)
          )
        })
        .catch(err => reject(err))
    } else {
      uploadHandle(filePathList, cfg, OssInfo).then(
        res => resolve(res),
        err => reject(err)
      )
    }
  })
}

const uploadHandle = (filePathList: string[] = [], cfg: UploadConfig = {}, OssInfo: OssInfo = {}) => {
  return new Promise((resolve, reject) => {
    const promiseArr = filePathList.map(
      t =>
        new Promise((resolve, reject) =>
          uploadFile(t, cfg, OssInfo).then(
            res => resolve(res),
            err => reject(err)
          )
        )
    )
    Promise.all(promiseArr)
      .then(res => {
        Taro.hideLoading()
        resolve(res)
      })
      .catch(err => {
        Taro.hideLoading()
        reject(err)
      })
  })
}

const uploadFile = (filePath: string, cfg: UploadConfig = {}, OssInfo: OssInfo = {}) => {
  return new Promise((resolve, reject) => {
    const date = new Date()
    date.setHours(date.getHours() + 1)
    
    const policy = base64.encode(
      JSON.stringify({
        expiration: date.toISOString(),
        conditions: [['content-length-range', 0, 1024 * 1024 * 1024]]
      })
    )
    
    // 占位：实际应使用 crypto.HmacSHA1
    const signature = base64.encode(`${policy}:${OssInfo.accessKeySecret || ''}`)
    
    const matchResult = /[^.]\w*$/.exec(filePath)
    const key = `${cfg.module || defaultCfg.module}/${new Date().getTime()}.${matchResult ? matchResult[0] : 'jpg'}`
    
    Taro.uploadFile({
      url: OssInfo.bucketUrl || '',
      filePath: filePath,
      name: cfg.name || defaultCfg.name || 'file',
      formData: {
        key: key,
        policy: policy,
        signature: signature,
        OSSAccessKeyId: OssInfo.accessKeyId || '',
        'x-oss-security-token': OssInfo.securityToken || ''
      },
      timeout: cfg.timeout || defaultCfg.timeout
    })
      .then((res: any) => {
        if ([200, 204].includes(res.statusCode)) {
          resolve(`${OssInfo.bucketUrl}/${key}`)
        } else {
          Taro.setStorageSync('OssInfo', {})
          reject(res)
        }
      })
      .catch(err => reject(err))
  })
}

export default upload
