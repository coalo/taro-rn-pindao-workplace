import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { tools, pathMap } from '@/utils'

interface MemberProps {
  isMember: boolean
  memberInfo: any
  storeInfo: any
}

const Member: React.FC<MemberProps> = ({ isMember, memberInfo, storeInfo }) => {
  // 点击用户信息
  const handleUserInfoClick = () => {
    // TODO: 实现 tools.loginIntercept 和 pathMap
    // tools.loginIntercept({ loginType: 'login', collect: { entrance_var: '首页-头像昵称' } }) &&
    //   Taro.navigateTo({ url: pathMap.userInfo })

    // getApp().sensors.track('KeyElementClick', {
    //   element_id: '',
    //   element_name: '头像昵称',
    //   element_type: '按钮',
    //   element_rank: 1,
    //   element_jump_link: pathMap.userInfo,
    //   page_title: '首页'
    // })
    console.log('handleUserInfoClick')
    Taro.showToast({ title: '跳转用户信息', icon: 'none' })
  }

  // 点击注册
  const handleRegisterClick = () => {
    // TODO: 实现登录组件调用
    // this.selectOwnerComponent().selectComponent('#login').openModal({
    //   loginType: 'phone',
    //   collect: { entrance_var: '首页-注册' }
    // })

    // getApp().sensors.track('KeyElementClick', {
    //   element_id: '',
    //   element_name: '新用户注册',
    //   element_type: '按钮',
    //   element_rank: 1,
    //   element_jump_link: pathMap.userInfo,
    //   page_title: '首页'
    // })
    console.log('handleRegisterClick')
    Taro.showToast({ title: '新用户注册', icon: 'none' })
  }

  // 点击权益卡
  const handleCardClick = (item: any) => {
    // TODO: 实现路径跳转
    // const path = Number(item.benefitCardType) === 2 ? pathMap.niceCard : pathMap.equityCardDetail
    // const url = tools.splicePageUrl(path, { id: item.benefitCardId })
    // Taro.navigateTo({ url })

    // getApp().sensors.track('KeyElementClick', {
    //   element_id: '',
    //   element_name: '权益卡',
    //   element_type: '按钮',
    //   element_rank: 5,
    //   element_jump_link: url,
    //   page_title: '首页'
    // })
    console.log('handleCardClick:', item)
    Taro.showToast({ title: '查看权益卡', icon: 'none' })
  }

  // 点击取餐号
  const handleCodeClick = () => {
    // TODO: 实现订单详情跳转
    // Taro.navigateTo({
    //   url: tools.splicePageUrl(pathMap.orderDetail, {
    //     orderId: memberInfo.currentOrder.orderId,
    //     currentFlag: true
    //   })
    // })

    // getApp().sensors.track('KeyElementClick', {
    //   element_id: '',
    //   element_name: '取餐号',
    //   element_type: '按钮',
    //   element_rank: 3,
    //   element_jump_link: pathMap.orderDetail,
    //   page_title: '首页'
    // })
    console.log('handleCodeClick')
    Taro.showToast({ title: '查看取餐号', icon: 'none' })
  }

  // 点击会员优惠券
  const handleMemberClick = () => {
    // TODO: 实现优惠券跳转
    // const couponConfig = memberInfo.couponConfig || {}
    // tools.navigateToAppRoute(couponConfig.route, '首页-会员模块')

    // getApp().sensors.track('KeyElementClick', {
    //   element_id: '',
    //   element_name: '奈雪券',
    //   element_type: '按钮',
    //   element_rank: 4,
    //   element_jump_link: couponConfig.route,
    //   page_title: '首页'
    // })
    console.log('handleMemberClick')
    Taro.showToast({ title: '查看奈雪券', icon: 'none' })
  }

  return (
    <View className="member-container">
      {/* 用户信息区域 */}
      <View className="member-user-info" onClick={handleUserInfoClick}>
        <Image
          className="member-avatar"
          src={memberInfo.avatar || ''}
          mode="aspectFill"
        />
        <Text className="member-nickname">{memberInfo.nickname || '未登录'}</Text>
      </View>

      {/* 非会员注册按钮 */}
      {!isMember && (
        <View className="member-register-btn" onClick={handleRegisterClick}>
          <Text>新用户注册</Text>
        </View>
      )}

      {/* 权益卡列表 */}
      {memberInfo.benefitCardList && memberInfo.benefitCardList.length > 0 && (
        <View className="member-card-list">
          {memberInfo.benefitCardList.map((item: any, index: number) => (
            <View
              key={index}
              className="member-card-item"
              onClick={() => handleCardClick(item)}
            >
              <Text>{item.benefitCardName}</Text>
            </View>
          ))}
        </View>
      )}

      {/* 当前订单取餐号 */}
      {memberInfo.currentOrder && (
        <View className="member-order-code" onClick={handleCodeClick}>
          <Text>取餐号: {memberInfo.currentOrder.orderNo}</Text>
        </View>
      )}

      {/* 奈雪券 */}
      {memberInfo.couponConfig && (
        <View className="member-coupon" onClick={handleMemberClick}>
          <Text>{memberInfo.couponConfig.title || '奈雪券'}</Text>
        </View>
      )}
    </View>
  )
}

export default Member
