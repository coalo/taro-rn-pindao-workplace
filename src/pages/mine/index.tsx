import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

// 在 RN 环境下使用 StyleSheet
const isRN = process.env.TARO_ENV === 'rn'

const styles = isRN ? {
  page: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  userSection: {
    padding: 24,
  },
  userCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#333',
    marginBottom: 8,
  },
  userGroup: {
    fontSize: 14,
    color: '#999',
  },
  menuSection: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
  },
  menuList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: 16,
    minHeight: 56,
  },
  menuItemLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  menuTextLogout: {
    fontSize: 16,
    color: '#ff4d4f',
  },
  menuArrow: {
    fontSize: 20,
    color: '#d9d9d9',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 52,
  },
  footer: {
    flex: 1,
    flexDirection: 'column' as const,
    justifyContent: 'flex-end' as const,
    alignItems: 'center' as const,
    padding: 24,
    paddingBottom: 32,
    minHeight: 150,
  },
  footerText: {
    fontSize: 12,
    color: '#bfbfbf',
    lineHeight: 20,
    textAlign: 'center' as const,
  },
} : {}

export default function Mine() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const userInfo = {
    name: '张三',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    group: '管理员组'
  }

  const menuItems = [
    { id: 1, title: '检查更新', icon: '🔄' },
    { id: 2, title: '修改密码', icon: '🔑' },
    { id: 3, title: '意见反馈', icon: '📝' },
    { id: 4, title: '设置语言', icon: '🌐' },
    { id: 5, title: '退出', icon: '🚪', isLogout: true },
  ]

  const handleMenuClick = (item: typeof menuItems[0]) => {
    console.log('点击:', item.title)
    // TODO: 处理菜单点击事件
  }

  return (
    <View className={isRN ? '' : 'page'} style={isRN ? styles.page : {}}>
      {/* 顶部用户信息区域 */}
      <View className={isRN ? '' : 'user-section'} style={isRN ? styles.userSection : {}}>
        <View className={isRN ? '' : 'user-card'} style={isRN ? styles.userCard : {}}>
          {/* 左侧头像 */}
          <Image 
            src={userInfo.avatar}
            className={isRN ? '' : 'avatar'}
            style={isRN ? styles.avatar : {}}
          />
          
          {/* 右侧信息 */}
          <View className={isRN ? '' : 'user-info'} style={isRN ? styles.userInfo : {}}>
            <Text className={isRN ? '' : 'user-name'} style={isRN ? styles.userName : {}}>{userInfo.name}</Text>
            <Text className={isRN ? '' : 'user-group'} style={isRN ? styles.userGroup : {}}>{userInfo.group}</Text>
          </View>
        </View>
      </View>

      {/* 中部菜单列表 */}
      <View className={isRN ? '' : 'menu-section'} style={isRN ? styles.menuSection : {}}>
        <View className={isRN ? '' : 'menu-list'} style={isRN ? styles.menuList : {}}>
          {menuItems.map((item, index) => (
            <View key={item.id}>
              <View 
                className={isRN ? '' : (item.isLogout ? 'menu-item menu-item-logout' : 'menu-item')}
                style={isRN ? styles.menuItem : {}}
                onClick={() => handleMenuClick(item)}
              >
                {/* 左侧图标和文字 */}
                <View className={isRN ? '' : 'menu-item-left'} style={isRN ? styles.menuItemLeft : {}}>
                  <Text className={isRN ? '' : 'menu-icon'} style={isRN ? styles.menuIcon : {}}>{item.icon}</Text>
                  <Text 
                    className={isRN ? '' : (item.isLogout ? 'menu-text menu-text-logout' : 'menu-text')}
                    style={isRN ? (item.isLogout ? styles.menuTextLogout : styles.menuText) : {}}
                  >
                    {item.title}
                  </Text>
                </View>
                
                {/* 右侧箭头 */}
                {!item.isLogout && (
                  <Text className={isRN ? '' : 'menu-arrow'} style={isRN ? styles.menuArrow : {}}>›</Text>
                )}
              </View>
              
              {/* 分割线 */}
              {index < menuItems.length - 1 && (
                <View className={isRN ? '' : 'divider'} style={isRN ? styles.divider : {}} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* 底部备案信息 */}
      <View className={isRN ? '' : 'footer'} style={isRN ? styles.footer : {}}>
        <Text className={isRN ? '' : 'footer-text'} style={isRN ? styles.footerText : {}}>版本号: v1.0.0</Text>
        <Text className={isRN ? '' : 'footer-text'} style={isRN ? styles.footerText : {}}>备案号: 京ICP备2024XXXXX号</Text>
        <Text className={isRN ? '' : 'footer-text'} style={isRN ? styles.footerText : {}}>© 2024 公司名称. All Rights Reserved.</Text>
      </View>
    </View>
  )
}
