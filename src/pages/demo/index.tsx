import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { Button, Card, AdaptView } from '../../components/common'
import { Button as UIButton } from '../../ui'
import { getPlatform } from '../../utils/platform'

// 仅在非 RN 环境引入 SCSS
if (process.env.TARO_ENV !== 'rn') {
  require('./index.scss')
}

// 条件导入 RN 专属组件
let NativeButton: any
let StatusBar: any

if (process.env.TARO_ENV === 'rn') {
  const nativeComponents = require('../../components/native')
  NativeButton = nativeComponents.NativeButton
  StatusBar = nativeComponents.StatusBar
}

export default function Demo() {
  useLoad(() => {
    console.log('Demo page loaded.')
  })

  const platform = getPlatform()
  const isRN = process.env.TARO_ENV === 'rn'

  const handleButtonClick = (type: string) => {
    Taro.showToast({
      title: `点击了${type}按钮`,
      icon: 'none'
    })
  }

  return (
    <ScrollView className="demo-page"><View className="demo-content">
      {/* RN 状态栏 */}
      {isRN && StatusBar && <StatusBar barStyle="dark-content" />}

      {/* 页面标题 */}
      <View className="demo-header">
        <Text className="demo-title">组件演示</Text>
        <Text className="demo-platform">当前平台: {platform}</Text>
      </View>

      {/* 通用按钮组件 */}
      <Card title="通用按钮组件 (Button)">
        <View className="demo-section">
          <Text className="section-desc">跨端可复用，支持 RN、H5、小程序</Text>
          
          <View className="button-group">
            <Button 
              type="primary" 
              onClick={() => handleButtonClick('Primary')}
            >
              Primary 按钮
            </Button>
            
            <Button 
              type="default" 
              onClick={() => handleButtonClick('Default')}
            >
              Default 按钮
            </Button>
            
            <Button 
              type="danger" 
              onClick={() => handleButtonClick('Danger')}
            >
              Danger 按钮
            </Button>
          </View>

          <Text className="subsection-title">不同尺寸</Text>
          <View className="button-group">
            <Button 
              type="primary" 
              size="small"
              onClick={() => handleButtonClick('Small')}
            >
              小按钮
            </Button>
            
            <Button 
              type="primary" 
              size="medium"
              onClick={() => handleButtonClick('Medium')}
            >
              中按钮
            </Button>
            
            <Button 
              type="primary" 
              size="large"
              onClick={() => handleButtonClick('Large')}
            >
              大按钮
            </Button>
          </View>

          <Text className="subsection-title">禁用状态</Text>
          <View className="button-group">
            <Button 
              type="primary" 
              disabled
            >
              禁用按钮
            </Button>
          </View>
        </View>
      </Card>

      {/* 通用卡片组件 */}
      <Card title="通用卡片组件 (Card)">
        <View className="demo-section">
          <Text className="section-desc">支持标题、边框、悬浮效果</Text>
          
          <Card 
            title="基础卡片" 
            bordered
          >
            <Text>这是一个基础卡片的内容区域</Text>
          </Card>

          <Card 
            title="可点击卡片" 
            bordered
            hoverable
            onClick={() => handleButtonClick('Card')}
          >
            <Text>点击这个卡片试试</Text>
          </Card>

          <Card 
            title="带额外内容的卡片"
            extra={<Text style={{ color: '#1890ff' }}>更多</Text>}
            bordered
          >
            <Text>右上角有额外内容的卡片</Text>
          </Card>

          <Card bordered={false}>
            <Text>无边框卡片</Text>
          </Card>
        </View>
      </Card>

      <Card title="AdaptView 原子类演示">
        <View className="demo-section">
          <Text className="section-desc">在业务页写 className，如 p-xl / px-base，无需环境判断</Text>

          <AdaptView className="p-xl px-base mt-base" style={{ backgroundColor: '#fff' }}>
            <Text>这个区域使用语义原子类：p-xl、px-base、mt-base</Text>
          </AdaptView>

          <AdaptView className="pt-sm pb-md px-lg m-base" style={{ backgroundColor: '#fff', marginTop: 12 }}>
            <Text>支持方向类：pt-sm / pb-md / px-lg / m-base</Text>
          </AdaptView>
          <AdaptView className="m-10" >
            <Text>支</Text>
          </AdaptView>
        </View>
      </Card>

      {/* RN 专属组件 */}
      {isRN && NativeButton && (
        <Card title="RN 专属组件 (仅 RN 环境)">
          <View className="demo-section">
            <Text className="section-desc">使用 React Native 原生组件</Text>
            
            <Text className="subsection-title">原生按钮 (Pressable)</Text>
            <View className="button-group">
              <NativeButton 
                type="primary"
                onPress={() => handleButtonClick('Native Primary')}
              >
                Native Primary
              </NativeButton>
              
              <NativeButton 
                type="default"
                onPress={() => handleButtonClick('Native Default')}
              >
                Native Default
              </NativeButton>
              
              <NativeButton 
                type="danger"
                onPress={() => handleButtonClick('Native Danger')}
              >
                Native Danger
              </NativeButton>
            </View>

            <Text className="subsection-title">特性说明</Text>
            <Text className="feature-text">• 使用 Pressable 提供原生交互体验</Text>
            <Text className="feature-text">• 按压时有缩放和透明度动画</Text>
            <Text className="feature-text">• 仅在 RN 环境下打包，H5 不会包含此代码</Text>
          </View>
        </Card>
      )}

      {/* 新版 UI 组件 */}
      <Card title="新版 UI 组件">
        <View className="demo-section">
          <Text className="section-desc">基础 UI 组件库</Text>
          
          <Text className="subsection-title">按钮类型</Text>
          <View className="button-group">
            <UIButton 
              type="primary" 
              onClick={() => handleButtonClick('UI Primary')}
            >
              Primary 按钮
            </UIButton>
            
            <UIButton 
              type="secondary" 
              onClick={() => handleButtonClick('UI Secondary')}
            >
              Secondary 按钮
            </UIButton>
            
            <UIButton 
              type="ghost" 
              onClick={() => handleButtonClick('UI Ghost')}
            >
              Ghost 按钮
            </UIButton>
            
            <UIButton 
              type="link" 
              onClick={() => handleButtonClick('UI Link')}
            >
              Link 按钮
            </UIButton>
          </View>

          <Text className="subsection-title">按钮尺寸</Text>
          <View className="button-group">
            <UIButton 
              size="small"
              onClick={() => handleButtonClick('UI Small')}
            >
              小按钮
            </UIButton>
            
            <UIButton 
              size="medium"
              onClick={() => handleButtonClick('UI Medium')}
            >
              中按钮
            </UIButton>
            
            <UIButton 
              size="large"
              onClick={() => handleButtonClick('UI Large')}
            >
              大按钮
            </UIButton>
          </View>

          <Text className="subsection-title">按钮状态</Text>
          <View className="button-group">
            <UIButton 
              disabled
            >
              禁用按钮
            </UIButton>
            
            <UIButton 
              loading
            >
              加载中按钮
            </UIButton>
          </View>
        </View>
      </Card>

      {/* 组件说明 */}
      <Card title="组件架构说明">
        <View className="demo-section">
          <Text className="subsection-title">📁 目录结构</Text>
          <Text className="code-text">components/</Text>
          <Text className="code-text">├── common/     # 通用组件（跨端）</Text>
          <Text className="code-text">├── native/     # RN专属组件</Text>
          <Text className="code-text">└── ui/         # 基础UI组件</Text>

          <Text className="subsection-title" style={{ marginTop: 16 }}>✨ 使用方式</Text>
          <Text className="feature-text">• 通用组件: import {'{'} Button {'}'} from '@/components'</Text>
          <Text className="feature-text">• UI组件: import {'{'} Button {'}'} from '@/ui'</Text>
          <Text className="feature-text">• RN组件: 仅在RN环境可用</Text>
          <Text className="feature-text">• 通过 process.env.TARO_ENV 条件编译</Text>
        </View>
      </Card>

      <View className="demo-footer">
        <Text className="footer-text">更多组件持续开发中...</Text>
      </View>
    </View></ScrollView>
  )
}
