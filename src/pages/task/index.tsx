import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'


export default function Task() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const tasks = [
    { id: 't1', title: '设计评审', desc: '完成本周 UI 评审', status: '待办' },
    { id: 't2', title: '接口联调', desc: '与后端联调用户模块', status: '进行中' },
    { id: 't3', title: '编写用例', desc: '补齐核心流程测试用例', status: '待办' },
  ]

  return (
    <View style={{ padding: 16 }}>
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 20 }}>任务中心</Text>
      </View>

      <View>
        <Text>组件库已清空，待重新组织</Text>
      </View>
    </View>
  )
}
