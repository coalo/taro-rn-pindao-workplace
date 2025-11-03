import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import { ScrollView } from 'react-native'

import './index.scss'

export default class Index extends Component<PropsWithChildren> {
  state = {
    count: 0,
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 })
  }

  handleDecrement = () => {
    this.setState({ count: Math.max(0, this.state.count - 1) })
  }

  render () {
    const { count } = this.state

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View className='index' style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' }}>
            Taro + React Native Demo
          </Text>

          {/* 计数器 */}
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15, textAlign: 'center' }}>计数器</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
              <View 
                style={{ width: 50, height: 50, backgroundColor: '#1890ff', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}
                onClick={this.handleDecrement}
              >
                <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold' }}>-</Text>
              </View>
              <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#333', minWidth: 60, textAlign: 'center' }}>
                {count}
              </Text>
              <View 
                style={{ width: 50, height: 50, backgroundColor: '#1890ff', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}
                onClick={this.handleIncrement}
              >
                <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold' }}>+</Text>
              </View>
            </View>
          </View>

          {/* 进度条 */}
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15 }}>进度条</Text>
            <View style={{ height: 20, backgroundColor: '#f0f0f0', borderRadius: 10, overflow: 'hidden' }}>
              <View style={{ 
                width: `${Math.min(count * 10, 100)}%`, 
                height: '100%', 
                backgroundColor: '#52c41a',
                transition: 'width 0.3s'
              }} />
            </View>
            <Text style={{ marginTop: 10, color: '#666', textAlign: 'center' }}>
              进度: {Math.min(count * 10, 100)}%
            </Text>
          </View>

          {/* 卡片列表 */}
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15 }}>信息卡片</Text>
            {[1, 2, 3].map((item) => (
              <View key={item} style={{ 
                padding: 15, 
                backgroundColor: '#f5f5f5', 
                borderRadius: 8, 
                marginBottom: 10,
                borderLeftWidth: 4,
                borderLeftColor: item === 1 ? '#1890ff' : item === 2 ? '#52c41a' : '#ff9800'
              }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 5 }}>卡片 {item}</Text>
                <Text style={{ color: '#666', fontSize: 14 }}>这是第 {item} 张卡片的内容描述</Text>
              </View>
            ))}
          </View>

          {/* 状态展示 */}
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15 }}>状态展示</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              <View style={{ padding: 8, backgroundColor: '#e6f7ff', borderRadius: 5 }}>
                <Text style={{ color: '#1890ff' }}>信息</Text>
              </View>
              <View style={{ padding: 8, backgroundColor: '#f6ffed', borderRadius: 5 }}>
                <Text style={{ color: '#52c41a' }}>成功</Text>
              </View>
              <View style={{ padding: 8, backgroundColor: '#fff7e6', borderRadius: 5 }}>
                <Text style={{ color: '#ff9800' }}>警告</Text>
              </View>
              <View style={{ padding: 8, backgroundColor: '#fff1f0', borderRadius: 5 }}>
                <Text style={{ color: '#f5222d' }}>错误</Text>
              </View>
            </View>
          </View>

          {/* 提示文本 */}
          <View style={{ marginTop: 30, padding: 15, backgroundColor: '#e6f7ff', borderRadius: 8, borderWidth: 1, borderColor: '#91d5ff' }}>
            <Text style={{ color: '#1890ff', textAlign: 'center', fontSize: 14 }}>
              👋 这是一个纯 Taro + React Native 的示例页面
            </Text>
            <Text style={{ color: '#69c0ff', textAlign: 'center', marginTop: 5, fontSize: 12 }}>
              不依赖任何第三方 UI 组件库
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}
