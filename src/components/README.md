# 组件目录说明

## 目录结构

```
components/
├── common/              # 通用组件（跨端可复用）
│   ├── Button/         # 按钮组件
│   ├── Card/           # 卡片组件
│   └── index.ts        # 统一导出
├── native/             # RN 专属组件（仅 RN 端打包）
│   ├── NativeButton/   # 原生按钮组件（使用 Pressable）
│   ├── StatusBar/      # 状态栏组件
│   └── index.ts        # 统一导出
├── index.ts            # 组件总入口
└── README.md           # 说明文档
```

## 组件分类

### 1. common - 通用组件

存放跨端可复用的组件，同时支持 RN、H5、小程序等多个平台。

**特点：**
- 使用 Taro 的跨端 API
- 通过 `getPlatformStyle` 工具函数适配不同平台的样式
- 同时提供 SCSS 样式（H5/小程序）和内联样式（RN）

**示例组件：**
- `Button` - 通用按钮组件
- `Card` - 通用卡片组件

### 2. native - RN 专属组件

存放仅在 React Native 环境下使用的组件，利用 RN 原生特性。

**特点：**
- 使用 RN 原生组件（如 Pressable、StatusBar 等）
- 通过 `process.env.TARO_ENV === 'rn'` 条件判断
- 非 RN 环境下不会被打包，避免编译错误

**示例组件：**
- `NativeButton` - 使用 Pressable 的原生按钮
- `StatusBar` - 状态栏控制组件

## 使用方式

### 导入通用组件

```typescript
import { Button, Card } from '@/components'

// 或者
import { Button } from '@/components/common'
```

### 导入 RN 专属组件

```typescript
// 仅在 RN 环境下可用
import { NativeButton, StatusBar } from '@/components'

// 或者
import { NativeButton } from '@/components/native'
```

## 开发规范

### 1. 通用组件开发规范

```typescript
// ✅ 正确：使用平台适配工具
import { getPlatformStyle } from '@/utils/platform'

const buttonStyle = getPlatformStyle(
  { padding: 12 },  // RN 样式
  'button'          // H5 className
)

<View {...buttonStyle}>按钮</View>
```

```typescript
// ❌ 错误：直接使用 RN 专属 API
import { Pressable } from 'react-native'
```

### 2. RN 专属组件开发规范

```typescript
// ✅ 正确：条件导入
if (process.env.TARO_ENV === 'rn') {
  const { Pressable } = require('react-native')
}

// ✅ 正确：条件渲染
if (process.env.TARO_ENV !== 'rn') {
  return null
}
```

### 3. 样式处理规范

**通用组件：**
- 提供 SCSS 文件供 H5/小程序使用
- 提供内联样式对象供 RN 使用
- 使用 `getPlatformStyle` 进行适配

**RN 专属组件：**
- 只需提供内联样式对象
- 无需 SCSS 文件

## 注意事项

1. **路径引用**：RN 项目中不支持 `@/` 路径别名，需使用相对路径
2. **条件编译**：使用 `process.env.TARO_ENV` 进行平台判断，Webpack 会在编译时删除无用代码
3. **类型安全**：所有组件都应提供完整的 TypeScript 类型定义
4. **命名规范**：
   - 通用组件：使用业务名称（如 `Button`、`Card`）
   - RN 专属组件：建议添加 `Native` 前缀（如 `NativeButton`）

## 扩展建议

可以根据项目需求添加更多组件分类：

```
components/
├── common/          # 通用组件
├── native/          # RN 专属组件
├── business/        # 业务组件
├── layout/          # 布局组件
└── form/            # 表单组件
```
