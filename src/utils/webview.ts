/**
 * WebView 平台适配模块
 * 统一不同平台的 WebView 组件接口
 */

/**
 * WebView 组件类型
 */
export type WebViewComponent = any

/**
 * WebView Source 类型
 */
export interface WebViewSource {
  html?: string
  uri?: string
}

/**
 * 获取适配后的 WebView 组件
 * 注意：这个函数必须在组件内部调用，不能在模块顶层调用
 */
export const getWebView = (): WebViewComponent => {
  // 使用 process.env.TARO_ENV 进行条件判断
  // Webpack 会在构建时删除不需要的分支
  if (process.env.TARO_ENV === 'rn') {
    // React Native 环境使用 react-native-webview
    const { WebView } = require('react-native-webview')
    return WebView
  } else {
    // H5/小程序环境使用 Taro WebView
    const { WebView } = require('@tarojs/components')
    return WebView
  }
}

/**
 * 适配 WebView 的 source 属性
 * RN: { html: string } 或 { uri: string }
 * H5: src="data:text/html..." 或 src="https://..."
 */
export const adaptWebViewSource = (source: WebViewSource): any => {
  if (process.env.TARO_ENV === 'rn') {
    // RN 直接使用 source 对象
    return source
  } else {
    // H5 需要转换为 src 字符串
    if (source.html) {
      // HTML 内容转为 Data URL
      return `data:text/html;charset=utf-8,${encodeURIComponent(source.html)}`
    } else if (source.uri) {
      // 直接使用 URI
      return source.uri
    }
    return ''
  }
}

/**
 * 适配 WebView 的消息事件
 * RN: event.nativeEvent.data
 * H5: event.detail.data
 */
export const getMessageData = (event: any): string => {
  return process.env.TARO_ENV === 'rn' ? event.nativeEvent?.data : event.detail?.data
}

/**
 * WebView Props 适配器
 * 统一不同平台的 props 接口
 */
export interface WebViewProps {
  source: WebViewSource
  onMessage?: (event: any) => void
  onLoad?: () => void
  onError?: (error: any) => void
  style?: any
}

/**
 * 适配 WebView Props
 * 将统一的 props 转换为平台特定的 props
 */
export const adaptWebViewProps = (props: WebViewProps): any => {
  const { source, onMessage, onLoad, onError, style } = props

  if (process.env.TARO_ENV === 'rn') {
    // React Native WebView props
    return {
      source,
      onMessage,
      onLoad,
      onError,
      style: style || { flex: 1 }
    }
  } else {
    // Taro WebView props
    return {
      src: adaptWebViewSource(source),
      onMessage,
      onLoad,
      onError
    }
  }
}
