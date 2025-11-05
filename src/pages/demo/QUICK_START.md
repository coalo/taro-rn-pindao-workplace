# 快速开始指南

## 🚀 5 分钟快速接入

### 步骤 1: 创建基础工具类（必需）

在 `src/utils/index.ts` 中创建最小化实现：

```typescript
import Taro from '@tarojs/taro'

// 简单的 request 实现
export const request = async (url: string, data?: any) => {
  try {
    const res = await Taro.request({
      url: `YOUR_API_BASE_URL${url}`,
      method: 'POST',
      data
    })
    return res.data
  } catch (err) {
    throw err
  }
}

// API 路径映射
export const apiMap = {
  getHomeBanner: '/api/home/banner',
  getMemberInfo: '/api/member/info',
  getHomeMarket: '/api/home/market',
  getHomeUIConfig: '/api/home/ui-config',
  getHomeConfig: '/api/home/config',
  commonPopup: '/api/common/popup',
  getValuationEntrance: '/api/valuation/entrance',
  gainTask: '/api/task/gain',
  clickTaskReward: '/api/task/reward',
  postTemplateWxApp: '/api/template/wxapp',
  getTaskSubscribe: '/api/task/subscribe',
  templateMsgSubscribe: '/api/template/msg-subscribe'
}

// 页面路径映射
export const pathMap = {
  home: '/pages/demo/index',
  menu: '/pages/menu/index',
  userInfo: '/pages/user/info',
  addressList: '/pages/address/list',
  orderDetail: '/pages/order/detail',
  taskDetail: '/pages/task/detail',
  questionSurvey: '/pages/question/survey',
  niceCard: '/pages/card/nice',
  equityCardDetail: '/pages/card/equity'
}

// 工具函数
export const tools = {
  loginIntercept: (options?: any) => {
    // 简单实现：直接返回 true，允许继续
    return true
  },
  navigateToAppRoute: (route: string, from?: string) => {
    console.log(`Navigate to: ${route}, from: ${from}`)
    Taro.navigateTo({ url: route })
  },
  splicePageUrl: (path: string, params?: Record<string, any>) => {
    if (!params) return path
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
    return `${path}?${query}`
  },
  getChannelCode: () => '',
  getScanCode: () => ({ regStoreCode: '' })
}

// 检查工具
export const check = {
  isMember: () => {
    // 简单实现：返回 false
    return false
  }
}

// 配置
export const config = {
  shareTitle: '奈雪的茶',
  shareImage: '',
  homeBannerDefaultImg: ''
}

// 业务工具（占位符）
export const business = {
  checkPopupLimitAndSetTimes: (data: any, page: string) => false,
  silentLocateStore: async () => {}
}

// 埋点工具（占位符）
export const sensors = {
  settingOrderForm: () => {}
}

// 数据同步（占位符）
export const dataSync = {
  updateChannel: async (channel: number) => {}
}
```

### 步骤 2: 模拟 getApp() 全局对象

在 `src/app.ts` 中添加：

```typescript
export default {
  globalData: {
    storeInfo: {
      storeId: '',
      storeName: '',
      show: 1
    },
    shareInfo: {
      home: {
        description: '奈雪的茶',
        path: '/pages/demo/index',
        image: ''
      }
    }
  },
  
  silentLogin: async () => {
    console.log('silentLogin')
    return Promise.resolve()
  },
  
  sensors: {
    track: (event: string, data?: any) => {
      console.log('[Sensors]', event, data)
    },
    modules: {
      Exposure: {
        addObserverByClassName: (className: string, options: any) => {
          console.log('[Sensors Exposure]', className)
        }
      }
    }
  },
  
  gioGlobal: {
    gio: (type: string, event: string, data?: any) => {
      console.log('[GIO]', type, event, data)
    }
  }
}
```

### 步骤 3: 配置路由

在 `src/app.config.ts` 中添加页面路径：

```typescript
export default {
  pages: [
    'pages/demo/index',  // 添加这一行
    // ... 其他页面
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
```

### 步骤 4: 创建占位通用组件（可选）

如果需要立即运行，可以创建简单的占位组件：

```typescript
// src/components/comLoading/index.tsx
import { View } from '@tarojs/components'
import { forwardRef, useImperativeHandle, useState } from 'react'

const Loading = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  
  useImperativeHandle(ref, () => ({
    openModal: () => setVisible(true),
    closeModal: () => setVisible(false)
  }))
  
  if (!visible) return null
  return <View>Loading...</View>
})

export default Loading
```

### 步骤 5: 运行项目

```bash
# 编译微信小程序
pnpm dev:weapp

# 或编译 H5
pnpm dev:h5
```

---

## 🎯 最小化实现 vs 完整实现

### 最小化实现（立即可运行）
- ✅ 创建基础工具类（10 分钟）
- ✅ 模拟全局对象（5 分钟）
- ✅ 配置路由（1 分钟）
- 📦 总计：约 15-20 分钟

### 完整实现（生产级别）
- ⚙️ 完善 API 请求封装
- ⚙️ 实现真实的登录拦截
- ⚙️ 集成埋点 SDK
- ⚙️ 创建完整通用组件
- 🎨 添加样式文件
- ⏰ 总计：约 2-3 天

---

## 📝 注意事项

### 1. API 接口
当前代码中的 API 调用都有错误处理，即使接口未实现也不会导致崩溃。

### 2. 通用组件
如果不创建通用组件（Loading、Auth 等），需要在 `index.tsx` 中注释掉相关引用：

```typescript
// 暂时注释这些
// <Auth ref={authRef} />
// <Loading ref={loadingRef} />
```

### 3. 埋点
所有埋点都已用 `console.log` 输出，可以在控制台查看埋点触发情况。

### 4. 样式
当前组件使用了 className，你可以：
- 选项 A: 创建对应的 SCSS 文件
- 选项 B: 使用项目现有的 Pd 组件系统
- 选项 C: 使用内联样式

---

## 🔧 常见问题

### Q1: 页面空白
**原因**: 可能缺少工具类实现  
**解决**: 检查 `src/utils/index.ts` 是否正确导出

### Q2: 编译报错
**原因**: 缺少类型定义  
**解决**: 确保安装了 `@tarojs/components` 的类型定义

### Q3: API 请求失败
**原因**: 接口地址未配置  
**解决**: 在 `request` 函数中配置正确的 `API_BASE_URL`

### Q4: 样式不显示
**原因**: className 未对应样式文件  
**解决**: 创建对应的 SCSS 文件或使用内联样式

---

## 📚 下一步

完成快速开始后，建议按以下顺序完善：

1. ✅ 实现真实 API 接口
2. ✅ 创建完整通用组件
3. ✅ 添加样式文件
4. ✅ 集成埋点系统
5. ✅ 添加错误处理
6. ✅ 性能优化

详细信息请查看 [README.md](./README.md) 和 [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)。

---

**祝开发顺利！** 🎉
