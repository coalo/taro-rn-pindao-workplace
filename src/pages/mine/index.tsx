import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Mine() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const userInfo = {
    name: '用户名称',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    level: 'VIP',
    points: 1280
  }

  const menuItems = [
    { id: 1, title: '我的订单', icon: '📋', badge: 3 },
    { id: 2, title: '我的收藏', icon: '⭐', badge: 0 },
    { id: 3, title: '浏览历史', icon: '🕒', badge: 0 },
    { id: 4, title: '设置', icon: '⚙️', badge: 0 },
  ]

  return (
    <View className='mine-page'>
      {/* 用户信息卡片 */}
      <View className='user-card bg-white rounded-base shadow-base p-md m-md'>
        <View className='flex items-center mb-md'>
          <Image 
            src={userInfo.avatar} 
            className='avatar rounded-full mr-md'
          />
          <View className='flex-1'>
            <View className='flex items-center mb-xs'>
              <Text className='text-lg font-bold mr-sm'>{userInfo.name}</Text>
              <View className='vip-badge'>
                <Text className='text-xs text-white'>{userInfo.level}</Text>
              </View>
            </View>
            <Text className='text-sm text-secondary'>积分: {userInfo.points}</Text>
          </View>
        </View>
        
        {/* 统计信息 */}
        <View className='stats-container flex justify-around border-t pt-md'>
          <View className='stat-item flex flex-column items-center'>
            <Text className='text-xl font-bold text-primary'>128</Text>
            <Text className='text-xs text-tertiary mt-xs'>关注</Text>
          </View>
          <View className='stat-item flex flex-column items-center'>
            <Text className='text-xl font-bold text-primary'>256</Text>
            <Text className='text-xs text-tertiary mt-xs'>粉丝</Text>
          </View>
          <View className='stat-item flex flex-column items-center'>
            <Text className='text-xl font-bold text-primary'>32</Text>
            <Text className='text-xs text-tertiary mt-xs'>赞</Text>
          </View>
        </View>
      </View>

      {/* 菜单列表 */}
      <View className='menu-list bg-white rounded-base shadow-base p-md m-md'>
        {menuItems.map((item, index) => (
          <View key={item.id}>
            <View className='menu-item flex items-center justify-between p-sm'>
              <View className='flex items-center flex-1'>
                <Text className='menu-icon mr-md'>{item.icon}</Text>
                <Text className='text-base'>{item.title}</Text>
              </View>
              <View className='flex items-center'>
                {item.badge > 0 && (
                  <View className='badge'>
                    <Text className='text-xs text-white'>{item.badge}</Text>
                  </View>
                )}
                <Text className='text-secondary ml-sm'>›</Text>
              </View>
            </View>
            {index < menuItems.length - 1 && <View className='divider' />}
          </View>
        ))}
      </View>

      {/* 退出按钮 */}
      <View className='m-md'>
        <View className='logout-btn bg-white rounded-base shadow-sm p-md flex items-center justify-center'>
          <Text className='text-base text-error'>退出登录</Text>
        </View>
      </View>
    </View>
  )
}
