import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Card from '../../components/common/Card'
import AdaptView from '../../components/common/AdaptView'
import UIButton from '../../ui/Button'


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
    <AdaptView className='p-md'>
      <Text className='font-40 mb-30'>任务中心</Text>

      <Card title='任务列表' extra={(
        <UIButton size='small'>新增任务</UIButton>
      )}>
        {tasks.map(item => (
          <AdaptView key={item.id} className='flex flex-row items-center justify-between py-10'>
            <AdaptView className='flex flex-column flex-1'>
              <Text className='font-16 font-medium text-base'>{item.title}</Text>
              <Text className='font-14 text-secondary mt-6'>{item.desc}</Text>
            </AdaptView>
            <AdaptView className='flex flex-row items-center'>
              <Text className='font-12 text-info mr-12'>{item.status}</Text>
              <UIButton size='small'>详情</UIButton>
            </AdaptView>
          </AdaptView>
        ))}
      </Card>
    </AdaptView>
  )
}
