# Demo 页面 - 首页模块迁移说明

## 📋 概述

本目录是将 `nayuki-wxapp/src/pages/index` 模块整体迁移为 Taro React 函数组件写法的实现。

## 📁 目录结构

```
src/pages/demo/
├── index.tsx                 # 页面主入口
├── index.config.ts          # 页面配置
├── components/              # 组件目录
│   ├── index.ts            # 组件统一导出
│   ├── Banner.tsx          # 轮播图组件
│   ├── Member.tsx          # 会员信息组件
│   ├── Mode.tsx            # 就餐方式组件
│   ├── Market.tsx          # 营销位组件
│   ├── Task.tsx            # 任务组件
│   ├── Article.tsx         # 文章组件
│   ├── Footer.tsx          # 页脚组件
│   ├── Questionnaire.tsx   # 问卷调查组件
│   └── Frame.tsx           # 页面框架组件
└── README.md               # 本说明文档
```

## ✅ 已完成内容

### 1. 页面结构迁移
- ✅ 所有 `Page({...})` 已改为 React 函数组件
- ✅ 所有 `Component({...})` 子组件已改为 React 函数组件
- ✅ 保留原有目录结构（components 子目录）

### 2. 生命周期迁移
- ✅ `onLoad` → `useLoad`
- ✅ `onShow` → `useDidShow`
- ✅ `onHide` → `useDidHide`
- ✅ `onShareAppMessage` → `useShareAppMessage`

### 3. 状态管理迁移
- ✅ 所有 `this.setData` 改为 `useState`
- ✅ 所有 `this.data` 改为状态变量
- ✅ 所有 `this.props` 改为 `useRef`

### 4. 异步请求改造
- ✅ 所有 Promise 改为 `async/await` 语法
- ✅ 使用 `Promise.allSettled` 处理并发请求

### 5. TypeScript 类型
- ✅ 所有文件使用 `.tsx` 扩展名
- ✅ 添加基础接口定义
- ✅ Props 类型定义

## ⚠️ 待实现功能（TODO）

### 1. 工具类引入
需要根据实际项目实现以下工具类：
```typescript
// @utils/index
- request       // API 请求封装
- apiMap        // API 路径映射
- pathMap       // 页面路径映射
- check         // 检查工具（如 isMember）
- tools         // 通用工具函数
- config        // 配置文件
- business      // 业务逻辑工具
- sensors       // 埋点工具
```

### 2. 通用组件引入
需要创建以下通用组件：
```typescript
- Login         // 登录组件
- Loading       // 加载组件
- Auth          // 授权组件
- PopupCenter   // 弹窗中心组件
- OfficialAccount // 公众号组件
- TaskReward    // 任务奖励组件
```

### 3. 组件引用方式调整
原小程序使用 `this.selectComponent('#xxx')` 的方式需要改为：
- 使用 `useRef` + `ref` 属性
- 或通过回调函数方式传递

### 4. API 接口实现
需要实现所有页面用到的 API：
```typescript
- getHomeBanner          // 获取首页 Banner
- getMemberInfo          // 获取会员信息
- getHomeMarket          // 获取首页营销位
- getHomeUIConfig        // 获取首页 UI 配置
- getHomeConfig          // 获取首页配置
- commonPopup            // 通用弹窗
- getValuationEntrance   // 获取问卷入口
- gainTask               // 领取任务
- clickTaskReward        // 点击任务奖励
- postTemplateWxApp      // 获取订阅消息模板
- getTaskSubscribe       // 获取任务订阅
- templateMsgSubscribe   // 订阅消息
```

### 5. 全局数据管理
需要实现 `getApp()` 全局数据：
```typescript
- globalData.storeInfo    // 门店信息
- globalData.shareInfo    // 分享信息
- silentLogin()           // 静默登录
- sensors                 // 埋点实例
- gioGlobal              // GIO 埋点实例
```

### 6. 埋点实现
需要实现以下埋点功能：
- ✅ Banner 曝光/点击埋点
- ✅ 关键元素点击埋点
- ✅ 就餐方式曝光/点击埋点
- ✅ 营销位曝光埋点
- ✅ 文章曝光/点击埋点
- ⚠️ Sensors 曝光监听器实现

### 7. 样式文件
需要创建对应的样式文件：
```
- index.scss           # 主页面样式
- Banner.scss          # 或使用内联样式/className
- Member.scss
- Mode.scss
- Market.scss
- Task.scss
- Article.scss
- Footer.scss
- Questionnaire.scss
- Frame.scss
```

## 🔧 使用方式

### 开发环境
```bash
# 安装依赖
pnpm install

# 运行开发环境（根据需要选择平台）
pnpm dev:weapp    # 微信小程序
pnpm dev:h5       # H5
pnpm dev:rn       # React Native
```

### 集成到项目
1. 确保所有 TODO 标记的依赖已实现
2. 根据项目实际路径调整 import 语句
3. 实现所有通用组件
4. 配置页面路由

## 📝 技术栈

- **框架**: Taro 3.x
- **语言**: TypeScript
- **UI**: Taro Components
- **状态管理**: React Hooks (useState, useRef)
- **生命周期**: Taro Hooks (useLoad, useDidShow, useDidHide)
- **跨平台**: 支持 RN、小程序、H5 三端

## 🎯 迁移对照表

| 原小程序写法 | Taro React 写法 | 说明 |
|-------------|----------------|------|
| `Page({...})` | `function Demo() {...}` | 页面组件 |
| `Component({...})` | `const Banner: React.FC = () => {...}` | 子组件 |
| `onLoad(options)` | `useLoad((options) => {...})` | 页面加载 |
| `onShow()` | `useDidShow(() => {...})` | 页面显示 |
| `onHide()` | `useDidHide(() => {...})` | 页面隐藏 |
| `onShareAppMessage()` | `useShareAppMessage(() => {...})` | 分享 |
| `this.setData({key: value})` | `setKey(value)` | 状态更新 |
| `this.data.key` | `key` | 状态读取 |
| `this.props.key` | `keyRef.current` | 属性管理 |
| `this.selectComponent('#id')` | `useRef` + 回调 | 组件引用 |
| `new Promise(...)` | `async/await` | 异步处理 |

## ⚡ 性能优化建议

1. **防抖节流**: 已在 Market 组件中实现点击节流
2. **懒加载**: 可考虑对大图片使用懒加载
3. **虚拟列表**: 如果列表数据量大，可使用虚拟列表优化
4. **memoization**: 对不常变化的组件使用 `React.memo`
5. **useCallback**: 对传递给子组件的回调函数使用 `useCallback`

## 🐛 已知问题

1. 部分工具类和 API 尚未实现，已用 TODO 标记
2. 埋点功能需要根据实际埋点 SDK 调整
3. 样式文件需要单独创建
4. 通用组件（Loading、Auth 等）需要实现

## 📞 联系方式

如有问题，请查看代码中的 TODO 注释，或联系开发团队。

---

**最后更新**: 2025-11-05
**版本**: 1.0.0
**维护者**: Qoder AI
