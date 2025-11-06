import { ScrollView } from '@tarojs/components'
import Taro, { useLoad, useDidShow, useDidHide } from '@tarojs/taro'
import { useState, useRef } from 'react'
import { PdView } from '@/components/PdCore'
import { request, apiMap, pathMap, check, tools, config, business, sensors } from '@/utils'
import type { BannerInfo, HomeConfigData } from '@/utils'

import {
  Banner,
  Member,
  Mode,
  Market,
  Task,
  Article,
  Footer,
  Questionnaire,
  Frame
} from './components'

// TODO: 通用组件引用，需要根据实际项目创建
// import Login from '@/components/comLogin'
// import Loading from '@/components/comLoading'
// import Auth from '@/components/comAuth'
// import PopupCenter from '@/components/comPopupCenter'
// import OfficialAccount from '@/components/comOfficialAccount'
// import TaskReward from '@/components/comTaskReward'

interface StoreInfo {
  storeId?: string
  show?: number
  [key: string]: any
}

interface MemberInfo {
  couponConfig?: any
  currentOrder?: any
  [key: string]: any
}

interface HomeUIInfo {
  homeDiningIcon?: any
  homeColor?: any
  [key: string]: any
}

export default function Demo() {
  // 状态管理
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({})
  const [bannerInfo, setBannerInfo] = useState<any[]>([])
  const [memberInfo, setMemberInfo] = useState<MemberInfo>({})
  const [homeUiInfo, setHomeUiInfo] = useState<HomeUIInfo>({})
  const [marketInfo, setMarketInfo] = useState<any[]>([])
  const [articleInfo, setArticleInfo] = useState<any>({})
  const [questionnaireInfo, setQuestionnaireInfo] = useState<any>({})
  const [popupActives, setPopupActives] = useState<any>({})
  const [isMember, setIsMember] = useState(false)
  const [bannerIndex, setBannerIndex] = useState(0)
  const [taskInfo, setTaskInfo] = useState<any>({})

  // 属性管理
  const loadComplete = useRef(false)
  const channelCode = useRef('')
  const shopId = useRef('')

  // TODO: 组件引用，待实现通用组件后使用
  // const authRef = useRef<any>(null)
  // const loadingRef = useRef<any>(null)
  // const loginRef = useRef<any>(null)
  // const popupCenterRef = useRef<any>(null)
  // const officialAccountRef = useRef<any>(null)
  // const taskRewardRef = useRef<any>(null)

  // 同步 Banner 索引
  const syncBannerIndex = (index: number) => {
    setBannerIndex(index)
  }

  // 检查并显示营销弹窗
  const noticeMarketPopup = () => {
    const isShowPopup = business.checkPopupLimitAndSetTimes(popupActives, 'home')
    // isShowPopup && popupCenterRef.current?.openModal({ pageFrom: '首页', channelCode: channelCode.current || '' })
    console.log('noticeMarketPopup - 弹窗检查结果:', isShowPopup)
  }

  // 获取首页 Banner
  const getHomeBanner = async () => {
    try {
      const res = await request<BannerInfo[]>(apiMap.getHomeBanner)
      setBannerInfo(res.data || [])
      console.log('getHomeBanner - Banner 数据:', res.data)
    } catch (err) {
      console.error('getHomeBanner error:', err)
      throw err
    }
  }

  // 获取会员信息
  const getMemberInfo = async () => {
    try {
      const res = await request(apiMap.getMemberInfo, {})
      setMemberInfo(res.data || {})
      console.log('getMemberInfo - 成功获取会员信息')
    } catch (err) {
      console.error('getMemberInfo error:', err)
      throw err
    }
  }

  // 获取首页营销位
  const getHomeMarket = async () => {
    try {
      const res = await request(apiMap.getHomeMarket)
      setMarketInfo(res.data || [])
      console.log('getHomeMarket - 成功获取营销位数据')
    } catch (err) {
      console.error('getHomeMarket error:', err)
      throw err
    }
  }

  // 获取首页 UI 配置
  const getHomeUIConfig = async () => {
    try {
      const res = await request(apiMap.getHomeUIConfig, {})
      setHomeUiInfo(res.data || {})
      console.log('getHomeUIConfig - 成功获取 UI 配置')
    } catch (err) {
      console.error('getHomeUIConfig error:', err)
      throw err
    }
  }

  // 获取配置信息
  const getConfigInfo = async () => {
    try {
      const res = await request(apiMap.getHomeConfig, {
        subjectParams: [{ subjectId: 18, isShow: true, filterStrategy: 101, strategyVersion: 1 }]
      })
      setArticleInfo((res.data && res.data[18] && res.data[18][0]) || [])
      console.log('getConfigInfo - 成功获取配置信息')
    } catch (err) {
      console.error('getConfigInfo error:', err)
      throw err
    }
  }

  // 获取弹窗活动
  const getPopupActive = async () => {
    try {
      const res = await request(apiMap.commonPopup, {
        showLocation: 3,
        channelCode: channelCode.current || ''
      })
      setPopupActives(res.data || {})
      console.log('getPopupActive - 成功获取弹窗活动')
    } catch (err) {
      console.error('getPopupActive error:', err)
      throw err
    }
  }

  // 获取问卷入口
  const getValuationEntrance = async () => {
    try {
      const res = await request(apiMap.getValuationEntrance, {
        storeId: storeInfo.storeId || ''
      })
      setQuestionnaireInfo(res.data || {})
      console.log('getValuationEntrance - 成功获取问卷入口')
    } catch (err) {
      console.error('getValuationEntrance error:', err)
      throw err
    }
  }

  // 初始化本地数据
  const initLocalData = async () => {
    const promiseArr = [
      getHomeBanner(),
      getMemberInfo(),
      getHomeMarket(),
      getConfigInfo(),
      getValuationEntrance(),
      getHomeUIConfig()
    ]

    if (storeInfo.show !== 2) {
      promiseArr.push(getPopupActive())
    }

    try {
      await Promise.allSettled(promiseArr)
      // TODO: 关闭加载组件
      // loadingRef.current?.closeModal()
      // officialAccountRef.current?.open({ type: 1 })
      noticeMarketPopup()
      loadComplete.current = true
    } catch (err) {
      console.error('initLocalData error:', err)
    }
  }

  // 刷新本地数据
  const refreshLocalData = async () => {
    const promiseArr = [
      getHomeBanner(),
      getMemberInfo(),
      getHomeMarket(),
      getConfigInfo(),
      getValuationEntrance(),
      getHomeUIConfig()
    ]

    try {
      await Promise.allSettled(promiseArr)
    } catch (err) {
      console.error('refreshLocalData error:', err)
    }
  }

  // 同步全局信息
  const syncGlobalInfo = () => {
    // TODO: 实现 getApp
    // const app = getApp()
    // setStoreInfo(app.globalData.storeInfo)
    setIsMember(check.isMember())
    console.log('syncGlobalInfo - 检查会员状态:', check.isMember())
    setStoreInfo({})
  }

  // 刷新任务信息
  const onRefreshTaskInfo = () => {
    // TODO: 实现任务刷新逻辑
    console.log('onRefreshTaskInfo - TODO: 实现任务刷新')
  }

  // 页面加载
  useLoad((options) => {
    console.log('Demo page loaded with options:', options)

    // TODO: 打开授权和加载组件
    // authRef.current?.openModal()
    // loadingRef.current?.openModal()

    channelCode.current = tools.getChannelCode()
    shopId.current = tools.getScanCode().regStoreCode || ''
    console.log('channelCode:', channelCode.current, 'shopId:', shopId.current)

    // TODO: 实现登录和定位逻辑
    // getApp().silentLogin().then(() => {
    //   business.silentLocateStore().then(() => {
    //     syncGlobalInfo()
    //     initLocalData()
    //   })
    // })

    // 临时：直接初始化数据
    syncGlobalInfo()
    initLocalData()

    // TODO: 实现 GIO 埋点
    // if (options.channelCode) {
    //   getApp().gioGlobal.gio('track', 'HomeExposure', { channelCode: options.channelCode })
    // }
  })

  // 页面显示
  useDidShow(() => {
    console.log('Demo page show')
    if (loadComplete.current) {
      syncGlobalInfo()
      refreshLocalData()
    }
    sensors.settingOrderForm()
  })

  // 页面隐藏
  useDidHide(() => {
    console.log('Demo page hide')
    // TODO: 关闭登录弹窗
    // loginRef.current?.closeModal()
  })

  // 分享配置（仅小程序端）
  if (process.env.TARO_ENV === 'weapp') {
    // 动态导入 useShareAppMessage，仅在小程序环境使用
    const { useShareAppMessage } = require('@tarojs/taro')
    useShareAppMessage(() => {
      return {
        title: config.shareTitle,
        path: pathMap.home,
        imageUrl: config.shareImage
      }
    })
  }

  return (
    <ScrollView className="bg-secondary" style={{ height: '100vh' }}>
      {/* TODO: Auth、Loading、Login、PopupCenter、OfficialAccount、TaskReward 组件待实现 */}
      {/* <Auth ref={authRef} />
      <Loading ref={loadingRef} />
      <Login ref={loginRef} />
      <PopupCenter ref={popupCenterRef} />
      <OfficialAccount ref={officialAccountRef} />
      <TaskReward ref={taskRewardRef} /> */}

      <Frame
        homeUiInfo={homeUiInfo}
        bannerInfo={bannerInfo}
        bannerIndex={bannerIndex}
      >
        {/* Banner 组件 */}
        <Banner
          storeInfo={storeInfo}
          bannerInfo={bannerInfo}
          onSyncBannerIndex={syncBannerIndex}
        />

        {/* Member 组件 */}
        <Member
          isMember={isMember}
          memberInfo={memberInfo}
          storeInfo={storeInfo}
        />

        {/* Mode 组件 */}
        <Mode
          homeUiInfo={homeUiInfo}
          storeInfo={storeInfo}
        />

        {/* Market 组件 */}
        <Market
          marketInfo={marketInfo}
          storeInfo={storeInfo}
        />

        {/* Task 组件 */}
        <Task
          taskInfo={taskInfo}
          storeInfo={storeInfo}
          onRefreshTaskInfo={onRefreshTaskInfo}
        />

        {/* Questionnaire 组件 */}
        <Questionnaire
          pageFrom="首页"
          questionnaireInfo={questionnaireInfo}
          orderStoreId=""
          orderStoreName=""
        />

        {/* Article 组件 */}
        <Article
          articleInfo={articleInfo}
          storeInfo={storeInfo}
        />

        {/* Footer 组件 */}
        <Footer />
      </Frame>
    </ScrollView>
  )
}
