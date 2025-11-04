import { View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { getWebView, adaptWebViewProps, getMessageData, WebViewSource } from '../../utils/webview'
import { safeJSONParse } from '../../utils'
import './index.scss'

// 子系统数据接口
interface SubsystemItem {
  id: number
  name: string
  desc: string
  icon: string
  color: string
  url: string
}

// 子系统数据列表
const subsystems: SubsystemItem[] = [
  { id: 1, name: '客户管理系统', desc: '客户信息管理、客户关系维护', icon: '👥', color: '#1890ff', url: 'https://www.baidu.com' },
  { id: 2, name: '订单管理系统', desc: '订单处理、订单跟踪、订单统计', icon: '📋', color: '#52c41a', url: 'https://www.taobao.com' },
  { id: 3, name: '库存管理系统', desc: '库存盘点、出入库管理、库存预警', icon: '📦', color: '#faad14', url: 'https://www.jd.com' },
  { id: 4, name: '财务管理系统', desc: '财务报表、收支管理、成本核算', icon: '💰', color: '#f5222d', url: 'https://www.163.com' },
  { id: 5, name: '人事管理系统', desc: '员工信息、考勤管理、薪资核算', icon: '👔', color: '#722ed1', url: 'https://www.sina.com.cn' },
  { id: 6, name: '数据分析系统', desc: '数据统计、可视化报表、智能分析', icon: '📊', color: '#13c2c2', url: 'https://www.qq.com' }
]

/**
 * 生成子系统列表的 HTML 内容
 */
const generateSubsystemHTML = (): string => {
  const subsystemsJSON = JSON.stringify(subsystems)
  
  return `
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
                transition: all 0.2s;
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
            const subsystems = ${subsystemsJSON};
            
            function renderSubsystems() {
                const list = document.getElementById('subsystemList');
                subsystems.forEach(sys => {
                    const item = document.createElement('div');
                    item.className = 'subsystem-item';
                    item.onclick = () => {
                        const message = JSON.stringify({ type: 'navigate', data: sys });
                        
                        // 在 H5 环境中使用 postMessage
                        if (window.parent && window.parent !== window) {
                            window.parent.postMessage(message, '*');
                        }
                        
                        // 在 RN WebView 中使用 ReactNativeWebView
                        if (window.ReactNativeWebView) {
                            window.ReactNativeWebView.postMessage(message);
                        }
                    };
                    item.innerHTML = \`
                        <div class="subsystem-icon" style="background: \${sys.color}20;">
                            \${sys.icon}
                        </div>
                        <div class="subsystem-content">
                            <div class="subsystem-name">\${sys.name}</div>
                            <div class="subsystem-desc">\${sys.desc}</div>
                        </div>
                        <div class="subsystem-arrow">›</div>
                    \`;
                    list.appendChild(item);
                });
            }
            
            document.addEventListener('DOMContentLoaded', renderSubsystems);
        </script>
    </body>
    </html>
  `
}

export default function Work() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const isRN = process.env.TARO_ENV === 'rn'
  
  // 在组件内部获取 WebView 组件（惰性加载）
  const WebView = getWebView()

  // WebView source：RN 使用内嵌 HTML，其他端使用独立文件
  const source: WebViewSource = isRN 
    ? { uri: 'https://www.baidu.com' }  // RN 端暂时使用外部链接，避免内嵌 HTML
    : { uri: 'https://www.baidu.com' }  // H5/小程序使用外部链接

  // WebView 消息处理
  const handleMessage = (event: any) => {
    try {
      // 使用平台适配的消息数据获取方法
      const messageData = getMessageData(event)
      const data = safeJSONParse(messageData)
      
      if (!data) {
        console.error('消息解析失败')
        return
      }
      
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
      console.error('处理WebView消息失败:', error)
    }
  }

  // 适配后的 WebView props
  const webViewProps = adaptWebViewProps({
    source,
    onMessage: handleMessage,
    onLoad: () => {
      console.log('WebView loaded successfully')
    },
    onError: (e) => {
      console.warn('WebView error: ', e)
      Taro.showToast({
        title: '页面加载失败',
        icon: 'none'
      })
    }
  })

  return (
    <View className="container">
      <WebView {...webViewProps} />
    </View>
  )
}
