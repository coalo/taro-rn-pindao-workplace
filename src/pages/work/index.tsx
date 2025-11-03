import { View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'

// 条件导入：RN 环境使用 react-native-webview，其他环境使用 Taro WebView
let WebViewComponent: any
let isRN = false

if (process.env.TARO_ENV === 'rn') {
  isRN = true
  const RNWebView = require('react-native-webview').WebView
  WebViewComponent = RNWebView
} else {
  const { WebView } = require('@tarojs/components')
  WebViewComponent = WebView
}

export default function Work() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  // H5子系统列表页面URL
  // 方式1: 使用远程URL（替换为你的实际URL）
  // const webViewUrl = 'https://your-h5-system.com/subsystems'

  // 方式2: 使用内嵌 HTML（用于演示）
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>子系统列表</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, sans-serif; background: #f5f7fa; padding: 16px; }
            .subsystem-list { display: grid; gap: 12px; }
            .subsystem-item {
                background: #fff; border-radius: 12px; padding: 16px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                display: flex; align-items: center; cursor: pointer;
            }
            .subsystem-item:active { transform: scale(0.98); background: #f9f9f9; }
            .subsystem-icon {
                width: 48px; height: 48px; border-radius: 10px;
                display: flex; align-items: center; justify-content: center;
                font-size: 24px; margin-right: 12px;
            }
            .subsystem-content { flex: 1; }
            .subsystem-name { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 4px; }
            .subsystem-desc { font-size: 13px; color: #999; }
            .subsystem-arrow { color: #ccc; font-size: 18px; }
            .header {
                background: #fff; margin: -16px -16px 16px; padding: 16px;
                text-align: center; font-size: 18px; font-weight: 600;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            }
        </style>
    </head>
    <body>
        <div class="header">子系统列表</div>
        <div class="subsystem-list" id="subsystemList"></div>
        <script>
            const subsystems = [
                { id: 1, name: '客户管理系统', desc: '客户信息管理、客户关系维护', icon: '👥', color: '#1890ff', url: 'https://www.baidu.com' },
                { id: 2, name: '订单管理系统', desc: '订单处理、订单跟踪、订单统计', icon: '📋', color: '#52c41a', url: 'https://www.taobao.com' },
                { id: 3, name: '库存管理系统', desc: '库存盘点、出入库管理、库存预警', icon: '📦', color: '#faad14', url: 'https://www.jd.com' },
                { id: 4, name: '财务管理系统', desc: '财务报表、收支管理、成本核算', icon: '💰', color: '#f5222d', url: 'https://www.163.com' },
                { id: 5, name: '人事管理系统', desc: '员工信息、考勤管理、薪资核算', icon: '👔', color: '#722ed1', url: 'https://www.sina.com.cn' },
                { id: 6, name: '数据分析系统', desc: '数据统计、可视化报表、智能分析', icon: '📊', color: '#13c2c2', url: 'https://www.qq.com' }
            ];
            function renderSubsystems() {
                const list = document.getElementById('subsystemList');
                subsystems.forEach(sys => {
                    const item = document.createElement('div');
                    item.className = 'subsystem-item';
                    item.onclick = () => {
                        // 在 H5 环境中使用 postMessage
                        if (window.parent) {
                            window.parent.postMessage(JSON.stringify({ type: 'navigate', data: sys }), '*');
                        }
                        // 在 RN WebView 中使用 ReactNativeWebView
                        if (window.ReactNativeWebView) {
                            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'navigate', data: sys }));
                        }
                    };
                    item.innerHTML = \`<div class="subsystem-icon" style="background: \${sys.color}20;">\${sys.icon}</div><div class="subsystem-content"><div class="subsystem-name">\${sys.name}</div><div class="subsystem-desc">\${sys.desc}</div></div><div class="subsystem-arrow">›</div>\`;
                    list.appendChild(item);
                });
            }
            document.addEventListener('DOMContentLoaded', renderSubsystems);
        </script>
    </body>
    </html>
  `

  // 将HTML转换为Data URL
  const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`

  // WebView消息处理
  const handleMessage = (event: any) => {
    try {
      // RN 和 H5 的事件结构不同
      const messageData = isRN ? event.nativeEvent.data : event.detail.data
      const data = JSON.parse(messageData)
      console.log('收到H5消息:', data)

      if (data.type === 'navigate') {
        // 处理子系统跳转
        Taro.showModal({
          title: '打开子系统',
          content: `名称: ${data.data.name}\n描述: ${data.data.desc}`,
          success: (res) => {
            if (res.confirm) {
              console.log('跳转到:', data.data.url)
              // 这里可以添加跳转逻辑，比如打开新的WebView页面
              // 或者使用 Taro.navigateTo 跳转到其他页面
            }
          }
        })
      }
    } catch (error) {
      console.error('解析H5消息失败:', error)
    }
  }

  // 渲染 WebView
  const renderWebView = () => {
    if (isRN) {
      // React Native 环境
      return (
        <WebViewComponent
          source={{ html: htmlContent }}
          onMessage={handleMessage}
          onError={(e: any) => {
            console.warn('WebView error: ', e)
            Taro.showToast({
              title: '页面加载失败',
              icon: 'none'
            })
          }}
          onLoad={() => {
            console.log('WebView loaded successfully')
          }}
          style={{ flex: 1 }}
        />
      )
    } else {
      // H5/小程序环境
      return (
        <WebViewComponent
          src={dataUrl}
          onMessage={handleMessage}
          onError={(e: any) => {
            console.warn('WebView error: ', e)
            Taro.showToast({
              title: '页面加载失败',
              icon: 'none'
            })
          }}
          onLoad={() => {
            console.log('WebView loaded successfully')
          }}
        />
      )
    }
  }

  return (
    <View className="container">
      {renderWebView()}
    </View>
  )
}
