/**
 * 公共样式快速开始示例
 * 展示如何在项目中使用公共样式模块
 */

import { View, Text } from '@tarojs/components'
if (process.env.TARO_ENV !== 'rn') {
  require('./quick-start.scss')
}

export default function QuickStartExample() {
  return (
    <View className='quick-start-page'>
      
      {/* ========== 方式一：使用工具类（推荐用于简单布局）========== */}
      <View className='section'>
        <Text className='text-lg font-bold mb-md'>1. 使用工具类</Text>
        
        {/* 卡片示例 */}
        <View className='bg-white rounded-base shadow-base p-md mb-md'>
          <View className='flex items-center justify-between mb-sm'>
            <Text className='text-md font-semibold'>标题</Text>
            <Text className='text-sm text-primary'>更多 ›</Text>
          </View>
          <Text className='text-sm text-secondary'>
            这是一个使用工具类构建的卡片组件
          </Text>
        </View>

        {/* Flex 布局示例 */}
        <View className='flex items-center bg-white rounded-base p-md mb-md'>
          <View className='bg-primary rounded-full mr-md' style={{ width: '40px', height: '40px' }} />
          <View className='flex-1'>
            <Text className='text-base font-medium mb-xs'>用户名</Text>
            <Text className='text-xs text-tertiary'>这是描述文本</Text>
          </View>
          <Text className='text-primary'>›</Text>
        </View>

        {/* 标签示例 */}
        <View className='flex'>
          <View className='bg-primary rounded-base p-sm mr-sm'>
            <Text className='text-xs text-white'>标签1</Text>
          </View>
          <View className='bg-success rounded-base p-sm mr-sm'>
            <Text className='text-xs text-white'>标签2</Text>
          </View>
          <View className='bg-warning rounded-base p-sm'>
            <Text className='text-xs text-white'>标签3</Text>
          </View>
        </View>
      </View>

      {/* ========== 方式二：使用 SCSS + 变量/Mixins（推荐用于复杂组件）========== */}
      <View className='section'>
        <Text className='text-lg font-bold mb-md'>2. 使用 SCSS + 变量/Mixins</Text>
        
        {/* 使用自定义类名 */}
        <View className='custom-card'>
          <View className='custom-card-header'>
            <Text className='custom-card-title'>自定义卡片</Text>
            <Text className='custom-card-extra'>操作</Text>
          </View>
          <View className='custom-card-body'>
            <Text className='custom-card-text'>
              这是使用 SCSS 变量和 Mixins 构建的卡片
            </Text>
          </View>
        </View>

        {/* 列表示例 */}
        <View className='custom-list'>
          {[1, 2, 3].map(item => (
            <View key={item} className='custom-list-item'>
              <Text>列表项 {item}</Text>
              <Text className='text-secondary'>›</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ========== 方式三：混合使用（推荐）========== */}
      <View className='section'>
        <Text className='text-lg font-bold mb-md'>3. 混合使用（推荐）</Text>
        
        {/* 工具类 + 自定义类 */}
        <View className='bg-white rounded-base shadow-base p-md mixed-component'>
          <View className='flex items-center mb-md'>
            <View className='icon-container'>
              <Text>🎨</Text>
            </View>
            <View className='flex-1 ml-md'>
              <Text className='text-md font-semibold mb-xs'>混合使用</Text>
              <Text className='text-sm text-secondary'>
                工具类负责布局，自定义类负责特殊样式
              </Text>
            </View>
          </View>
          
          <View className='flex justify-between'>
            <View className='metric-item'>
              <Text className='text-xl font-bold text-primary'>128</Text>
              <Text className='text-xs text-tertiary mt-xs'>数据1</Text>
            </View>
            <View className='metric-item'>
              <Text className='text-xl font-bold text-success'>256</Text>
              <Text className='text-xs text-tertiary mt-xs'>数据2</Text>
            </View>
            <View className='metric-item'>
              <Text className='text-xl font-bold text-warning'>512</Text>
              <Text className='text-xs text-tertiary mt-xs'>数据3</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ========== 常用组合示例 ========== */}
      <View className='section'>
        <Text className='text-lg font-bold mb-md'>4. 常用组合</Text>
        
        {/* 头像+信息 */}
        <View className='flex items-center bg-white rounded-base p-md mb-md'>
          <View className='bg-primary rounded-full mr-md' style={{ width: '48px', height: '48px' }} />
          <View className='flex-1'>
            <Text className='text-base font-medium'>用户名称</Text>
            <Text className='text-sm text-secondary'>用户描述信息</Text>
          </View>
          <View className='bg-error rounded-full' style={{ width: '8px', height: '8px' }} />
        </View>

        {/* 输入框样式 */}
        <View className='bg-white rounded-base p-md mb-md border'>
          <Text className='text-sm text-secondary mb-xs'>输入框标签</Text>
          <View className='flex items-center border-b pb-sm'>
            <Text className='text-base flex-1'>输入内容</Text>
            <Text className='text-tertiary'>›</Text>
          </View>
        </View>

        {/* 按钮组 */}
        <View className='flex justify-between'>
          <View className='flex-1 bg-white rounded-base p-md mr-sm border flex items-center justify-center'>
            <Text className='text-base'>取消</Text>
          </View>
          <View className='flex-1 bg-primary rounded-base p-md flex items-center justify-center'>
            <Text className='text-base text-white font-medium'>确定</Text>
          </View>
        </View>
      </View>

    </View>
  )
}
