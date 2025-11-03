import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { StyleSheet } from 'react-native'
import { colors, spacing, fontSize, getShadowStyle } from '../../styles/tokens'

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
    <View style={styles.page}>
      {/* 顶部用户信息区域 */}
      <View style={styles.userSection}>
        <View style={styles.userCard}>
          {/* 左侧头像 */}
          <Image 
            src={userInfo.avatar}
            style={styles.avatar}
          />
          
          {/* 右侧信息 */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userGroup}>{userInfo.group}</Text>
          </View>
        </View>
      </View>

      {/* 中部菜单列表 */}
      <View style={styles.menuSection}>
        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <View key={item.id}>
              <View 
                style={item.isLogout ? { ...styles.menuItem, ...styles.menuItemLogout } : styles.menuItem}
                onClick={() => handleMenuClick(item)}
              >
                {/* 左侧图标和文字 */}
                <View style={styles.menuItemLeft}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text style={item.isLogout ? { ...styles.menuText, ...styles.menuTextLogout } : styles.menuText}>
                    {item.title}
                  </Text>
                </View>
                
                {/* 右侧箭头 */}
                {!item.isLogout && (
                  <Text style={styles.menuArrow}>›</Text>
                )}
              </View>
              
              {/* 分割线 */}
              {index < menuItems.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* 底部备案信息 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>版本号: v1.0.0</Text>
        <Text style={styles.footerText}>备案号: 京ICP备2024XXXXX号</Text>
        <Text style={styles.footerText}>© 2024 公司名称. All Rights Reserved.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
  },
  
  // 用户信息区域
  userSection: {
    padding: spacing.md,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderRadius: 12,
    padding: spacing.lg,
    ...getShadowStyle('base'),
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userGroup: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  
  // 菜单区域
  menuSection: {
    padding: spacing.md,
    paddingTop: 0,
  },
  menuList: {
    backgroundColor: colors.bg,
    borderRadius: 12,
    overflow: 'hidden',
    ...getShadowStyle('sm'),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    minHeight: 56,
  },
  menuItemLogout: {
    backgroundColor: colors.bg,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: fontSize.xl,
    marginRight: spacing.md,
  },
  menuText: {
    fontSize: fontSize.base,
    color: colors.text,
  },
  menuTextLogout: {
    color: colors.error,
  },
  menuArrow: {
    fontSize: fontSize.xl,
    color: colors.textTertiary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginLeft: spacing.md + fontSize.xl + spacing.md,
  },
  
  // 底部备案信息
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  footerText: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    lineHeight: 20,
    textAlign: 'center',
  },
})
