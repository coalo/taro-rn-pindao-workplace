React Native Template for Taro
====

基于 Taro 框架的 React Native 模板项目，用于构建跨平台移动应用，支持 iOS、Android、H5、小程序等多端。

## 🏗️ 三层解耦架构

本项目采用清晰的三层架构设计，确保代码可维护性和跨平台兼容性：

```
[ 业务层 (pages/) ]
        ↓
[ UI 公共组件层 (components/) ]
        ↓  
[ 平台适配层 (utils/platform/, platform/) ]
```

### 架构层级说明

#### 📱 第一层：业务层 (pages/)
- **职责**：业务逻辑、页面交互、数据流转
- **原则**：只关注业务，不直接使用平台 API 或原生组件
- **实现**：通过 hooks、services 处理业务逻辑，通过公共组件渲染 UI

```typescript
// ✅ 正确：通过封装层使用
import { Button, Card } from '@/components'
import { showToast } from '@/utils/platform'

// ❌ 错误：直接使用平台 API
import { Button } from '@ant-design/react-native'
import Taro from '@tarojs/taro'
```

#### 🎨 第二层：UI 公共组件层 (components/)
- **职责**：封装可复用的 UI 组件，抹平跨端差异
- **分类**：
  - `common/` - 跨端通用组件（优先使用）
  - `native/` - 平台特定组件（RN 专属）
  - `ui/` - 基础 UI 组件（底层可复用）
- **原则**：对外提供统一接口，内部处理平台差异

```typescript
// components/common/Button/index.tsx - 统一接口
export interface ButtonProps {
  type?: 'primary' | 'default'
  onPress?: () => void
  children: React.ReactNode
}

// 内部根据平台使用不同实现
import ButtonImpl from './Button'  // 默认实现

// ui/Button/index.tsx - 基础UI组件
export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'ghost' | 'link'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}
```

#### ⚙️ 第三层：平台适配层
- **职责**：封装原生组件、第三方库、平台 API
- **位置**：
  - `utils/platform/` - 平台 API 封装（如相机、定位）
  - `platform/` - 第三方库封装（如支付、分享）
- **原则**：提供统一的 TypeScript 接口，隐藏平台实现细节

```typescript
// utils/platform/toast.ts - 统一接口
export function showToast(message: string) {
  // 内部根据平台调用不同 API
}
```

### 🎯 核心设计原则

| 原则 | 说明 | 示例 |
|------|------|------|
| **逻辑与 UI 分离** | 逻辑（hooks/状态管理）通用，UI 可分端实现 | 业务逻辑在 `.tsx`，样式分 `.scss` 和 `.rn.ts` |
| **跨端优先** | 能通用就通用，确实不同才分端 | 优先使用 `common/` 组件，必要时用 `native/` |
| **分端后缀机制** | 充分利用 Taro 的条件编译 | `.rn.tsx` / `.weapp.tsx` / `.h5.tsx` |
| **封装而非直接引用** | 不在业务中直接用第三方库，通过封装层统一导出 | 封装 `ant-design-rn` 为自己的 `@/components` |
| **统一接口设计** | 所有平台实现必须符合统一的 TypeScript 接口 | 定义 `CameraOptions` 接口，各平台遵循 |
| **类型安全优先** | 所有封装层提供完整的类型定义 | 导出接口、类型、枚举等 |

### 📂 目录结构与职责

```
src/
├── pages/                    # 【业务层】页面和业务逻辑
│   └── user/
│       ├── index.tsx         # 业务逻辑（通用）
│       ├── index.scss        # H5/小程序样式
│       └── index.rn.ts       # RN 样式
│
├── components/               # 【UI 组件层】封装的公共组件
│   ├── common/              # 跨端通用组件（优先）
│   │   ├── Button/
│   │   │   ├── index.tsx    # 组件逻辑
│   │   │   ├── index.scss   # H5 样式
│   │   │   └── index.rn.ts  # RN 样式
│   │   └── Card/
│   ├── native/              # RN 专属组件
│   │   └── StatusBar/
│   └── index.ts             # 统一导出入口
│
├── ui/                      # 【基础UI组件层】底层可复用组件
│   ├── Button/              # 基础按钮组件
│   │   ├── index.tsx        # H5/小程序实现
│   │   ├── index.rn.tsx     # RN 实现
│   │   ├── style.scss       # 样式文件
│   │   ├── types.ts         # H5/小程序类型定义
│   │   └── types.rn.ts      # RN 类型定义
│   └── index.ts             # 统一导出入口
│
├── utils/                    # 【平台适配层】工具函数
│   ├── platform/            # 平台 API 封装
│   │   ├── toast.ts         # 提示封装
│   │   ├── camera/          # 相机封装
│   │   │   ├── index.ts     # 统一接口
│   │   │   ├── camera.rn.ts
│   │   │   └── camera.weapp.ts
│   │   └── location/        # 定位封装
│   └── index.ts
│
├── platform/                 # 【平台适配层】第三方库封装
│   ├── payment/             # 支付
│   │   ├── index.ts         # 统一接口
│   │   ├── payment.rn.ts    # RN 实现
│   │   └── payment.weapp.ts # 小程序实现
│   └── share/               # 分享
│
├── hooks/                    # 自定义 Hooks（通用）
├── services/                 # API 服务层（通用）
├── constants/                # 业务常量（通用）
└── styles/                   # 样式系统
    ├── scss/                # SCSS 文件（H5/小程序）
    └── tokens/              # Design Tokens（跨端）
```

### 🔄 数据流向示例

#### 示例 1：使用封装的组件

```typescript
// ❌ 错误：直接使用第三方库
import { Button } from '@ant-design/react-native'

function Page() {
  return <Button>点击</Button>
}
```

```typescript
// ✅ 正确：使用封装后的组件
import { Button } from '@/components'

function Page() {
  return <Button type="primary">点击</Button>
}

// components/common/Button/index.tsx
import { Button as AntButton } from '@ant-design/react-native'

export function Button({ type, children, ...props }) {
  // 在这里统一处理跨端差异
  return <AntButton type={type}>{children}</AntButton>
}
```

#### 示例 2：使用基础 UI 组件

```typescript
// ✅ 使用基础 UI 组件
import { Button as UIButton } from '@/ui'

function Page() {
  return (
    <View>
      <UIButton type="primary" size="large">主要按钮</UIButton>
      <UIButton type="secondary" size="medium">次要按钮</UIButton>
      <UIButton type="ghost" size="small" disabled>禁用按钮</UIButton>
    </View>
  )
}

// 业务组件中使用基础 UI 组件
// components/common/Button/index.tsx
import { Button as UIButton } from '@/ui'

export function Button({ type, size, disabled, children, ...props }) {
  // 映射业务组件属性到基础 UI 组件
  const uiType = type === 'primary' ? 'primary' : 'secondary'
  const uiSize = size === 'large' ? 'large' : size === 'small' ? 'small' : 'medium'
  
  return (
    <UIButton 
      type={uiType} 
      size={uiSize} 
      disabled={disabled}
      {...props}
    >
      {children}
    </UIButton>
  )
}
```

#### 示例 2：使用封装的平台 API

```typescript
// ❌ 错误：直接调用平台 API
import Taro from '@tarojs/taro'

function handleClick() {
  Taro.showToast({ title: '成功' })
}
```

```typescript
// ✅ 正确：使用封装的工具函数
import { showToast } from '@/utils/platform'

function handleClick() {
  showToast('成功')
}

// utils/platform/toast.ts
import Taro from '@tarojs/taro'

export function showToast(message: string, duration = 2000) {
  Taro.showToast({
    title: message,
    icon: 'none',
    duration,
  })
}
```

#### 示例 3：平台特定功能封装

```typescript
// ✅ 业务层调用
import { chooseImage } from '@/utils/platform/camera'

async function handleSelectImage() {
  const result = await chooseImage({ count: 1 })
  console.log(result.tempFilePaths)
}

// ✅ 平台适配层 - 统一接口
// utils/platform/camera/index.ts
export interface CameraOptions {
  count?: number
}

export interface CameraResult {
  tempFilePaths: string[]
}

export * from './camera'  // 导出平台特定实现

// ✅ RN 实现
// utils/platform/camera/camera.rn.ts
import { launchImageLibrary } from 'react-native-image-picker'

export async function chooseImage(options: CameraOptions): Promise<CameraResult> {
  const result = await launchImageLibrary({ selectionLimit: options.count })
  return {
    tempFilePaths: result.assets?.map(a => a.uri) || [],
  }
}

// ✅ 小程序实现
// utils/platform/camera/camera.weapp.ts
import Taro from '@tarojs/taro'

export async function chooseImage(options: CameraOptions): Promise<CameraResult> {
  const result = await Taro.chooseImage({ count: options.count || 1 })
  return {
    tempFilePaths: result.tempFilePaths,
  }
}
```

### ✅ 架构优势

1. **易于维护**：每层职责清晰，修改时影响范围可控
2. **跨端一致**：业务层无需关心平台差异，组件层统一处理
3. **可替换性**：可以轻松替换底层实现（如更换 UI 库）
4. **类型安全**：TypeScript 类型定义贯穿始终
5. **可测试性**：每层都可以独立测试
6. **团队协作**：不同层可以并行开发

### 🚀 开发流程

1. **平台适配层**：先封装平台 API 和第三方库
2. **UI 组件层**：基于适配层构建公共组件
3. **业务层**：使用组件层和服务层实现业务

这样的架构确保了代码的可维护性、可扩展性和跨平台兼容性！

## Requirement

0. taro: `@tarojs/cli@^3.5.0`
1. framework: 'react'
2. node: >= 16.x
3. pnpm: >= 7.x
## Quick Start

### install react native library
> install peerDependencies of `@tarojs/taro-rn` `@tarojs/components-rn` and `@tarojs/router-rn`, it will also run `post-install`. please modify and run `upgradePeerdeps` script when you change taro version.
> 
> **run this script after project inited.**

`pnpm upgradePeerdeps`

### pod install
> run this script when you add new react native library or update react native library version.
> 
> see [pod-install](https://www.npmjs.com/package/pod-install) for more infomation.

`pnpm podInstall`

### start ios app

`pnpm ios`

### start android app

`pnpm android`

### start bundler

`pnpm start`

### more infomations

0. [development process of taro react native](https://docs.taro.zone/docs/next/react-native)
1. [github](https://github.com/NervJS/taro)

## 🎯 跨端兼容设计原则

为了确保代码在多个平台（React Native、H5、微信小程序等）上的一致性和可维护性，请遵循以下设计原则：

| 原则 | 说明 | 示例 |
|------|------|------|
| **逻辑统一** | 保持数据流、状态管理通用，使用跨端兼容的状态管理库（如 `redux`、`zustand`、`jotai`） | `src/store/`、`src/hooks/` |
| **UI 分端** | 复杂交互、原生能力采用 `.rn.tsx` / `.weapp.tsx` 文件分离，实现物理隔离 | `Component.tsx`（H5）<br/>`Component.rn.tsx`（RN） |
| **组件解耦** | 将通用组件与平台组件区分目录，保持职责清晰 | `components/common/`（通用）<br/>`components/native/`（RN 专属） |
| **API 层隔离** | 不直接使用 `wx.*` 或 React Native API，而是经封装调用，提供统一接口 | `src/utils/platform.ts`<br/>`src/utils/webview.ts` |
| **样式统一单位** | 使用 Taro 推荐的尺寸单位，或 `pxTransform()` 进行转换，避免直接使用平台特定单位 | 设计稿 750px，代码中直接写 `750px` |
| **条件编译** | 使用 `process.env.TARO_ENV` 判断平台，实现差异化逻辑 | `if (process.env.TARO_ENV === 'rn')` |
| **类型安全** | 所有封装层、服务层均提供 TypeScript 类型定义 | `services/`、`hooks/`、`utils/` |
| **配置分离** | 环境变量、平台配置分离管理，避免耦合 | `config/env.dev.ts`<br/>`config/env.prod.ts` |

### 具体实践示例

#### 1. UI 分端示例

```typescript
// 通用逻辑：src/pages/mine/index.tsx
import { View } from '@tarojs/components'
import './index.scss'  // H5 样式
import styles from './index.rn'  // RN 样式

const isRN = process.env.TARO_ENV === 'rn'

export default function Mine() {
  return (
    <View className={isRN ? '' : 'page'} style={isRN ? styles.page : {}}>
      {/* 内容 */}
    </View>
  )
}
```

```scss
// H5 样式：src/pages/mine/index.scss
.page {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}
```

```typescript
// RN 样式：src/pages/mine/index.rn.ts
export default {
  page: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
}
```

#### 2. API 层隔离示例

```typescript
// src/utils/platform.ts
import Taro from '@tarojs/taro'

/**
 * 获取系统信息（封装后的统一接口）
 */
export async function getSystemInfo() {
  try {
    const info = await Taro.getSystemInfo()
    return info
  } catch (error) {
    console.error('Failed to get system info:', error)
    return null
  }
}

/**
 * 判断当前平台
 */
export const isWeapp = process.env.TARO_ENV === 'weapp'
export const isH5 = process.env.TARO_ENV === 'h5'
export const isRN = process.env.TARO_ENV === 'rn'
```

#### 3. 组件解耦示例

```
src/components/
├── common/           # 跨端可复用组件
│   ├── Button/
│   └── Card/
└── native/          # RN 专属组件（仅 RN 端打包）
    ├── NativeButton/
    └── StatusBar/
```

### 注意事项

1. **SCSS 限制**：React Native 不支持 SCSS，需要使用 StyleSheet 或内联样式
2. **样式单位**：H5 端建议关闭 `pxtransform`（`h5.postcss.pxtransform.enable = false`），避免样式缩放
3. **路径别名**：Sass 的 `@use` 规则不支持 Webpack 别名（如 `@/`），必须使用相对路径
4. **条件编译**：优先使用 `.rn.tsx` 文件后缀实现物理隔离，避免过多运行时判断

## 📐 页面设计实践建议

针对不同类型的业务模块，推荐采用以下最佳实践：

| 模块类型 | 推荐做法 | 示例文件 |
|---------|---------|----------|
| **公共页面逻辑** | 写在 `.tsx` 默认文件中，包含数据获取、状态管理、业务逻辑 | `pages/user/index.tsx` |
| **UI 样式** | 使用 SCSS（H5/小程序），通过 Flex 布局实现自适配；RN 端使用独立样式文件 | `index.scss` + `index.rn.ts` |
| **原生交互**<br/>（拍照、地图等） | 封装 RN 和小程序各自实现文件，提供统一接口 | `utils/camera.rn.ts`<br/>`utils/camera.weapp.ts` |
| **三方库**<br/>（支付、分享等） | 在 `platform/` 下封装接口层，隔离平台差异 | `platform/payment/`<br/>`platform/share/` |
| **动画 / 手势** | RN 端使用 `react-native-reanimated`，小程序端使用 `Taro.createAnimation` | 按平台选择动画方案 |

### 具体实践示例

#### 1. 公共页面逻辑（`.tsx` 文件）

```typescript
// src/pages/user/index.tsx
import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { getUserInfo } from '@/services/user'
import './index.scss'

export default function UserPage() {
  const [userInfo, setUserInfo] = useState(null)
  
  useEffect(() => {
    // 公共业务逻辑：数据获取
    fetchUserData()
  }, [])
  
  const fetchUserData = async () => {
    const data = await getUserInfo()
    setUserInfo(data)
  }
  
  return (
    <View className="user-page">
      <Text>{userInfo?.name}</Text>
    </View>
  )
}
```

#### 2. UI 样式分端处理

```scss
// H5/小程序样式：src/pages/user/index.scss
.user-page {
  display: flex;
  flex-direction: column;
  padding: 32px;
  background-color: #f5f5f5;
  
  // 使用 Flex 布局实现自适配
  .user-card {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
```

```typescript
// RN 样式：src/pages/user/index.rn.ts
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  userPage: {
    flex: 1,
    padding: 32,
    backgroundColor: '#f5f5f5',
  },
  userCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
```

#### 3. 原生交互封装（拍照示例）

```typescript
// src/utils/camera/index.ts - 统一接口定义
export interface CameraOptions {
  count?: number
  sizeType?: string[]
  sourceType?: string[]
}

export interface CameraResult {
  tempFilePaths: string[]
  tempFiles: any[]
}

// 导出平台特定实现
export * from './camera'
```

```typescript
// src/utils/camera/camera.rn.ts - RN 实现
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import type { CameraOptions, CameraResult } from './index'

export async function chooseImage(options: CameraOptions): Promise<CameraResult> {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: options.count || 1,
  })
  
  return {
    tempFilePaths: result.assets?.map(asset => asset.uri) || [],
    tempFiles: result.assets || [],
  }
}
```

```typescript
// src/utils/camera/camera.weapp.ts - 小程序实现
import Taro from '@tarojs/taro'
import type { CameraOptions, CameraResult } from './index'

export async function chooseImage(options: CameraOptions): Promise<CameraResult> {
  const result = await Taro.chooseImage({
    count: options.count || 1,
    sizeType: options.sizeType || ['original', 'compressed'],
    sourceType: options.sourceType || ['album', 'camera'],
  })
  
  return {
    tempFilePaths: result.tempFilePaths,
    tempFiles: result.tempFiles,
  }
}
```

#### 4. 三方库封装（支付示例）

```typescript
// src/platform/payment/index.ts - 统一接口
export interface PaymentParams {
  orderId: string
  amount: number
  description: string
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  errorMsg?: string
}

// 根据平台导出不同实现
import { pay } from './payment'
export { pay }
```

```typescript
// src/platform/payment/payment.rn.ts - RN 支付实现
import type { PaymentParams, PaymentResult } from './index'
// 假设使用某个 RN 支付 SDK
import AlipaySDK from 'react-native-alipay'

export async function pay(params: PaymentParams): Promise<PaymentResult> {
  try {
    const orderInfo = await fetchOrderInfo(params.orderId)
    const result = await AlipaySDK.pay(orderInfo)
    
    return {
      success: result.resultStatus === '9000',
      transactionId: result.result,
    }
  } catch (error) {
    return {
      success: false,
      errorMsg: error.message,
    }
  }
}
```

```typescript
// src/platform/payment/payment.weapp.ts - 小程序支付实现
import Taro from '@tarojs/taro'
import type { PaymentParams, PaymentResult } from './index'

export async function pay(params: PaymentParams): Promise<PaymentResult> {
  try {
    const orderInfo = await fetchOrderInfo(params.orderId)
    
    await Taro.requestPayment({
      timeStamp: orderInfo.timeStamp,
      nonceStr: orderInfo.nonceStr,
      package: orderInfo.package,
      signType: orderInfo.signType,
      paySign: orderInfo.paySign,
    })
    
    return { success: true }
  } catch (error) {
    return {
      success: false,
      errorMsg: error.errMsg,
    }
  }
}
```

#### 5. 动画 / 手势处理

```typescript
// RN 端使用 react-native-reanimated
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

function AnimatedComponent() {
  const offset = useSharedValue(0)
  
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))
  
  const handlePress = () => {
    offset.value = withSpring(offset.value + 100)
  }
  
  return <Animated.View style={animatedStyles}>...</Animated.View>
}
```

```typescript
// 小程序端使用 Taro.createAnimation
import Taro from '@tarojs/taro'
import { useState } from 'react'

function AnimatedComponent() {
  const [animationData, setAnimationData] = useState({})
  
  const handlePress = () => {
    const animation = Taro.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    
    animation.translateX(100).step()
    setAnimationData(animation.export())
  }
  
  return <View animation={animationData}>...</View>
}
```

### 目录组织建议

```
src/
├── pages/                  # 页面目录
│   └── user/
│       ├── index.tsx       # 公共逻辑（所有平台）
│       ├── index.scss      # H5/小程序样式
│       └── index.rn.ts     # RN 样式
├── platform/               # 平台特定功能封装
│   ├── payment/           # 支付模块
│   │   ├── index.ts       # 统一接口
│   │   ├── payment.rn.ts  # RN 实现
│   │   └── payment.weapp.ts  # 小程序实现
│   └── share/             # 分享模块
├── utils/                  # 工具函数
│   ├── camera/            # 相机/相册
│   │   ├── index.ts
│   │   ├── camera.rn.ts
│   │   └── camera.weapp.ts
│   └── location/          # 定位
```

### 最佳实践总结

1. **逻辑与视图分离**：业务逻辑写在通用 `.tsx` 文件，样式按平台分离
2. **统一接口设计**：原生功能和三方库都应提供统一的 TypeScript 接口
3. **按需加载**：利用 Taro 的条件编译，只打包对应平台的代码
4. **类型安全**：所有平台特定实现都要符合统一接口的类型定义
5. **优雅降级**：对于不支持的功能，提供合理的降级方案或提示

## 📁 项目目录结构

```
rn-test/
├── android/                 # Android 原生项目
├── ios/                     # iOS 原生项目
├── config/                  # 构建配置
│   ├── index.ts             # Taro 主配置
│   ├── dev.ts               # 开发环境配置
│   ├── prod.ts              # 生产环境配置
│   ├── env.ts               # 环境变量统一导出
│   ├── env.dev.ts           # 开发环境变量
│   └── env.prod.ts          # 生产环境变量
├── src/                     # 源代码目录
│   ├── assets/              # 静态资源
│   ├── components/          # 组件目录
│   │   ├── common/          # 跨端通用组件
│   │   └── native/          # RN 专属组件
│   ├── constants/           # 常量定义
│   │   ├── api.ts           # API 相关常量
│   │   ├── common.ts        # 通用常量
│   │   └── index.ts         # 统一导出
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useAsync.ts      # 异步请求 Hook
│   │   ├── useDebounce.ts   # 防抖 Hook
│   │   ├── useThrottle.ts   # 节流 Hook
│   │   └── index.ts         # 统一导出
│   ├── pages/               # 页面目录
│   │   ├── index/           # 首页
│   │   ├── mine/            # 我的页面
│   │   ├── task/            # 任务页面
│   │   └── work/            # 工作页面
│   ├── services/            # API 服务层
│   │   ├── request.ts       # 请求封装
│   │   ├── auth.ts          # 认证服务
│   │   ├── user.ts          # 用户服务
│   │   └── index.ts         # 统一导出
│   ├── styles/              # 样式目录
│   │   ├── scss/            # SCSS 文件（H5/小程序使用）
│   │   │   ├── _variables.scss  # 变量定义
│   │   │   ├── _mixins.scss     # Mixins
│   │   │   └── _utilities.scss  # 工具类
│   │   └── tokens/          # Design Tokens（跨端使用）
│   │       ├── colors.ts
│   │       ├── spacing.ts
│   │       └── typography.ts
│   ├── utils/               # 工具函数
│   │   ├── platform.ts      # 平台判断工具
│   │   ├── webview.ts       # WebView 工具
│   │   └── index.ts         # 统一导出
│   ├── app.config.ts        # 应用配置
│   ├── app.scss             # 全局样式
│   ├── app.ts               # 应用入口
│   └── index.html           # H5 入口
├── dist/                    # 构建输出目录
│   ├── h5/                  # H5 构建输出
│   ├── weapp/               # 微信小程序构建输出
│   ├── rn/                  # React Native 构建输出
│   │   ├── android/         # Android bundle 输出
│   │   └── ios/             # iOS bundle 输出
│   └── [other-platform]/    # 其他平台构建输出
├── types/                   # TypeScript 类型定义
├── .eslintrc                # ESLint 配置
├── babel.config.js          # Babel 配置
├── metro.config.js          # Metro 配置
├── package.json             # 项目依赖
├── project.config.json      # Taro 项目配置
└── tsconfig.json            # TypeScript 配置
```

### 目录说明

- **`components/common`**：存放跨端可复用的通用组件
- **`components/native`**：存放 RN 专属组件，仅在 RN 端打包
- **`ui`**：存放基础 UI 组件，提供底层可复用的 UI 元素
- **`constants`**：统一管理业务常量
- **`hooks`**：自定义 React Hooks，封装可复用逻辑
- **`services`**：API 请求和业务服务层
- **`styles/scss`**：SCSS 样式文件，仅 H5 和小程序使用
- **`styles/tokens`**：Design Tokens，跨端使用的设计变量
- **`utils`**：工具函数和平台适配层
- **`dist`**：构建输出目录，根据不同平台分别存放构建结果

## 构建与部署

### 构建输出目录

项目构建后会根据目标平台将输出文件存放在 `dist/` 目录下的对应子目录中：

- `dist/h5/` - H5 应用构建输出
- `dist/weapp/` - 微信小程序构建输出
- `dist/rn/android/` - React Native Android bundle 输出
- `dist/rn/ios/` - React Native iOS bundle 输出

### 构建命令

```bash
# 构建 H5 应用
pnpm build:h5

# 构建微信小程序
pnpm build:weapp

# 构建 React Native 应用
pnpm build:rn

# 构建所有平台
pnpm build:all
```

### 构建特定平台的 React Native bundle

```bash
# 构建 iOS bundle
pnpm build:rn --platform ios

# 构建 Android bundle
pnpm build:rn --platform android
```

### 发布 iOS 应用

see [publishing-to-app-store](https://reactnative.cn/docs/publishing-to-app-store) for details.

### 发布 Android APK

see [signed-apk-android](https://reactnative.cn/docs/signed-apk-android) for details.

## github workflows
> use github actions to build your apps. this template include basic github action config.

see [.github/workflows](.github/workflows) for details.

### events

we assemble debug and release product for both android and ios when you push or pull request on master branch by default. design your own workflows by modify [.github/workflows](.github/workflows) files.

see [events-that-trigger-workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows) 
### ios

#### configuration

Modify the following configuration items for package and publish your app.

> [.github/workflows/assemble_ios_debug.yml](.github/workflows/assemble_ios_debug.yml)
> [.github/workflows/assemble_ios_release.yml](.github/workflows/assemble_ios_release.yml)

```yml
env:
  APP_ID: com.taro.demo # Application Product Bundle Identifier
  APP_NAME: Taro Demo # The Display Name of your app
  VERSION_NUMBER: 1.0.0 # Application version number
  BUILD_NUMBER: 1.0.0.0 # Application build number, used by release only.
  TEAM_ID: XXXXXXXXXX # Team ID, is used when upgrading project
  PROVISIONING_PROFILE_SPECIFIER: Product_profile # Provisioning profile name to use for code signing
  CODE_SIGN_IDENTITY: iPhone Distribution # Code signing identity type (iPhone Developer, iPhone Distribution)
  SIGNING_CERTIFICATE_P12_DATA: ${{secrets.RELEASE_SIGNING_CERTIFICATE_P12_DATA}}
  SIGNING_CERTIFICATE_PASSWORD: ${{secrets.RELEASE_SIGNING_CERTIFICATE_PASSWORD}}
  PROVISIONING_PROFILE_DATA: ${{secrets.RELEASE_PROVISIONING_PROFILE_DATA}}
  APP_STORE_CONNECT_USERNAME: ${{secrets.APP_STORE_CONNECT_USERNAME}} # This secret should be set to the Apple ID of your developer account, used by release only.
  APP_STORE_CONNECT_PASSWORD: ${{secrets.APP_STORE_CONNECT_PASSWORD}} # used by release only.
```

values like ${{secrets.xxxxx}} are manually generated and store in your github encrypted secrets.

##### SIGNING_CERTIFICATE_P12_DATA

`cat Certificates.p12 | base64 | pbcopy`

##### SIGNING_CERTIFICATE_PASSWORD

encryption password of your Personal Information Exchange (.p12)

##### PROVISIONING_PROFILE_DATA

`cat profile.mobileprovision | base64 | pbcopy`

##### APP_STORE_CONNECT_PASSWORD

This secret should be set to an application-specific password for your Apple ID account. Follow [these instructions](https://support.apple.com/en-us/HT204397) to create an application-specific password.

#### Read more

1. [deploy an ios app to testflight or the app store using github actions](https://betterprogramming.pub/deploy-an-ios-app-to-testflight-or-the-app-store-using-github-actions-c4d7082b1430)
2. [encrypted-secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)
3. [fastlane](https://docs.fastlane.tools/)

### android

#### configuration

Modify the following configuration items for package and publish your app.

> [.github/workflows/assemble_android_debug.yml](.github/workflows/assemble_android_debug.yml)
> [.github/workflows/assemble_android_release.yml](.github/workflows/assemble_android_release.yml)

```yml
env:
  APP_ID: com.taro.demo  # Application Product Bundle Identifier
  APP_NAME: Taro Demo  # The Display Name of your app
  APP_ICON: ic_launcher  # The Application icon of your app
  APP_ROUND_ICON: ic_launcher_round  # The Application round icon of your app
  APP_ABI_FILTERS: armeabi-v7a, arm64-v8a # App abi filters
  VERSION_NAME: 1.0.0 # version name
  VERSION_CODE: 10 # version code
  KEYSTORE_FILE: debug.keystore # key store file
  KEYSTORE_PASSWORD: android # key store password
  KEYSTORE_KEY_ALIAS: androiddebugkey # key store key alias
  KEYSTORE_KEY_PASSWORD: android # key store key password
```

For the security of your app, please regenerate the .keystore file and store the password in your github encrypted secrets.
#### Read more

1. [app signing](https://developer.android.com/studio/publish/app-signing)
2. [encrypted-secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)

## links

0. [template source code](https://github.com/NervJS/taro-project-templates/tree/v4.0/react-native)
1. [sample project](https://github.com/wuba/taro-playground)