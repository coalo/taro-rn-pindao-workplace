import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
if (process.env.TARO_ENV !== 'rn') {
  require('./index.scss')
}

export default function Task() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='task-container'>
      <Text className='title'>任务中心</Text>
    </View>
  )
}
