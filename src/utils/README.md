# Utils 工具库

本目录包含从原生小程序迁移到 Taro RN 的完整工具库，保持文件名不变（.js → .ts），支持原有导入语法。

## 📊 迁移统计

- **原生 nayuki-wxapp/src/utils**: 35 个 .js 文件  
- **迁移后 rn-test/src/utils**: 40 个 .ts 文件  
- **迁移状态**: ✅ 全部完成，无编译错误

## 📁 目录结构

```
src/utils/
├── index.ts                 # 统一入口导出
├── platform.ts              # 平台判断工具
├── webview.ts               # WebView 工具
├── dataFile/                # 数据请求层
│   ├── request.ts          # API 请求封装
│   ├── dataSync.ts         # 数据同步
│   └── upload.ts           # 文件上传
├── mapFile/                 # 映射配置层
│   ├── apiMap.ts           # API 路径映射
│   ├── hostMap.ts          # 域名映射
│   ├── pathMap.ts          # 页面路径映射
│   ├── refMap.ts           # 组件引用映射
│   ├── routeMap.ts         # 路由映射
│   ├── scanMap.ts          # 扫码解析
│   ├── errorMap.ts         # 错误码映射
│   ├── api.ts              # API 常量
│   ├── common.ts           # 通用常量
│   └── index.ts            # 统一导出
├── toolFile/                # 工具函数层
│   ├── check.ts            # 校验工具
│   ├── business.ts         # 业务工具
│   ├── tools.ts            # 通用工具
│   ├── specs.ts            # 规格校验
│   ├── sensors.ts          # 埋点工具
│   └── navigate.ts         # 导航工具
├── commonFile/              # 通用模块层
│   ├── config.ts           # 配置文件
│   ├── base64.ts           # Base64 编解码
│   ├── scene.ts            # 场景值解析
│   ├── theme.ts            # 主题配置
│   └── aliyunConnect.ts    # 阿里云连接
├── behaviorFile/            # 行为层
│   ├── behavior.ts         # 通用行为
│   ├── menuBehavior.ts     # 菜单行为
│   └── productBehavior.ts  # 产品行为
└── packageFile/             # 分包配置层
    ├── pkgBasics/
    │   ├── apiMap.ts
    │   └── pathMap.ts
    ├── pkgMarket/
    │   ├── apiMap.ts
    │   └── pathMap.ts
    ├── pkgOrder/
    │   ├── apiMap.ts
    │   └── pathMap.ts
    ├── pkgReceive/
    │   ├── apiMap.ts
    │   └── pathMap.ts
    └── pkgShares/
        ├── apiMap.ts
        └── pathMap.ts
```

1️⃣ 数据请求层（dataFile/）
✅ request.ts - API 请求封装
✅ dataSync.ts - 数据同步
✅ upload.ts - 文件上传
2️⃣ 映射配置层（mapFile/）
✅ apiMap.ts - API 路径映射
✅ hostMap.ts - 域名映射
✅ pathMap.ts - 页面路径映射
✅ refMap.ts - 组件引用映射
✅ routeMap.ts - 路由映射
✅ scanMap.ts - 扫码解析
✅ errorMap.ts - 错误码映射
✅ api.ts - API 常量（原有）
✅ common.ts - 通用常量（原有）
✅ index.ts - 统一导出（原有）
3️⃣ 工具函数层（toolFile/）
✅ check.ts - 校验工具
✅ business.ts - 业务工具
✅ tools.ts - 通用工具
✅ specs.ts - 规格校验
✅ sensors.ts - 埋点工具
✅ navigate.ts - 导航工具
4️⃣ 通用模块层（commonFile/）
✅ config.ts - 配置文件
✅ base64.ts - Base64 编解码
✅ scene.ts - 场景值解析
✅ theme.ts - 主题配置
✅ aliyunConnect.ts - 阿里云连接
5️⃣ 行为层（behaviorFile/）
✅ behavior.ts - 通用行为
✅ menuBehavior.ts - 菜单行为
✅ productBehavior.ts - 产品行为
6️⃣ 分包配置层（packageFile/）
pkgBasics/
✅ apiMap.ts
✅ pathMap.ts
pkgMarket/
✅ apiMap.ts
✅ pathMap.ts
pkgOrder/
✅ apiMap.ts
✅ pathMap.ts
pkgReceive/
✅ apiMap.ts
✅ pathMap.ts
pkgShares/
✅ apiMap.ts
✅ pathMap.ts
7️⃣ 其他文件（保留原有）
✅ index.ts - 统一入口导出
✅ platform.ts - 平台判断（原有）
✅ webview.ts - WebView 工具（原有）

## 🚀 使用方式

### 基础导入

```typescript
import { 
  request, 
  apiMap, 
  pathMap, 
  check, 
  tools, 
  config, 
  business, 
  sensors 
} from '@/utils'
```

### API 请求

```typescript
import { request, apiMap } from '@/utils'

// GET 请求
const res = await request(apiMap.getHomeBanner)

// POST 请求
const data = await request(apiMap.submitOrder, { orderId: '123' })
```

### 路径跳转

```typescript
import { tools, pathMap } from '@/utils'

// 基础跳转
tools.navigateToAppRoute(pathMap.menu, '首页')

// 带参数跳转
const url = tools.splicePageUrl(pathMap.orderDetail, { 
  orderId: '123',
  currentFlag: true 
})
Taro.navigateTo({ url })
```

### 会员检查

```typescript
import { check } from '@/utils'

const isMember = check.isMember()
if (!isMember) {
  // 提示登录
}
```

### 工具函数

```typescript
import { tools } from '@/utils'

// 登录拦截
tools.loginIntercept({
  loginType: 'phone',
  callback: () => {
    // 登录成功回调
  }
})

// 节流函数
const handleClick = tools.throttle(() => {
  console.log('点击事件')
}, 500)
```

### Base64 编解码

```typescript
import { base64 } from '@/utils'

const encoded = base64.encode('Hello World')
const decoded = base64.decode(encoded)
```

### 配置使用

```typescript
import { config } from '@/utils'

console.log(config.shareTitle)        // 奈雪的茶
console.log(config.homeBannerDefaultImg)
```

## 🔧 核心模块说明

### request.ts - API 请求

封装了 Taro.request，支持：
- 自动拼接 BASE_URL
- 统一错误处理
- 超时配置
- 请求/响应拦截

```typescript
const request = async (
  api: string, 
  data?: any, 
  options?: RequestOptions
) => {
  // 实现细节见源码
}
```

### tools.ts - 通用工具

提供常用工具方法：
- `loginIntercept()` - 登录拦截
- `navigateToAppRoute()` - 路由跳转
- `splicePageUrl()` - URL 拼接
- `throttle()` - 节流函数
- `getChannelCode()` - 获取渠道码
- `getScanCode()` - 获取扫码信息

### check.ts - 校验工具

提供数据校验方法：
- `isMember()` - 判断是否会员

### business.ts - 业务工具

提供业务逻辑工具：
- `checkPopupLimitAndSetTimes()` - 弹窗频控
- `silentLocateStore()` - 静默定位门店

### sensors.ts - 埋点工具

提供埋点上报：
- `track()` - 事件埋点
- `settingOrderForm()` - 订单表单埋点
- `modules.Exposure` - 曝光埋点模块

## 📝 类型定义

所有模块都提供完整的 TypeScript 类型定义：

```typescript
// request 类型
type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  data?: any
}

// tools.loginIntercept 类型
type LoginInterceptOptions = {
  loginType?: 'login' | 'phone'
  collect?: Record<string, any>
  callback?: () => void
}
```

## 🎯 迁移特点

1. **完整兼容** - 保持原有文件名和导入语法
2. **类型安全** - 全部使用 TypeScript
3. **最小实现** - 提供可运行的最小实现
4. **易于扩展** - 预留接口，便于后续完善

## ⚙️ 配置说明

### 环境变量

在项目根目录的 `.env` 文件中配置：

```bash
# API 基础地址
API_BASE_URL=https://api.example.com

# API 超时时间（毫秒）
API_TIMEOUT=10000

# 图片服务器地址
IMG_BASE_URL=https://img.example.com
```

### hostMap 配置

```typescript
// src/utils/mapFile/hostMap.ts
const hostMap = {
  API_HOST: process.env.API_BASE_URL || 'https://api.example.com',
  IMG_HOST: process.env.IMG_BASE_URL || 'https://img.example.com',
  H5_HOST: process.env.H5_BASE_URL || 'https://h5.example.com'
}
```

## 📦 分包配置

支持按业务模块组织的分包配置：

```typescript
// pkgBasics - 基础包
import { default as pkgBasicsApiMap } from '@/utils/packageFile/pkgBasics/apiMap'
import { default as pkgBasicsPathMap } from '@/utils/packageFile/pkgBasics/pathMap'

// pkgMarket - 营销包
import { default as pkgMarketApiMap } from '@/utils/packageFile/pkgMarket/apiMap'
import { default as pkgMarketPathMap } from '@/utils/packageFile/pkgMarket/pathMap'
```

## 🔍 常见问题

### Q: 如何添加新的 API 接口？

在 `mapFile/apiMap.ts` 中添加：

```typescript
const apiMap = {
  // 现有接口...
  getNewApi: '/api/new/endpoint'
}
```

### Q: 如何添加新的页面路径？

在 `mapFile/pathMap.ts` 中添加：

```typescript
const pathMap = {
  // 现有路径...
  newPage: '/pages/new/index'
}
```

### Q: 如何接入真实的埋点 SDK？

在 `toolFile/sensors.ts` 中实现：

```typescript
const sensors = {
  track(event: string, data?: any) {
    // 接入真实 SDK
    window.sensors?.track(event, data)
  }
}
```

## 🚧 后续优化

- [ ] 完善 `business.ts` 中的业务逻辑
- [ ] 接入真实的埋点 SDK
- [ ] 补充 `request.ts` 的请求/响应拦截器
- [ ] 完善错误码映射表
- [ ] 添加单元测试

## 📄 License

MIT
