# Config 配置目录

Taro 项目配置文件，用于管理构建配置和环境变量。

## 📁 目录结构

```
config/
├── README.md          # 配置说明文档
├── index.ts           # Taro 主配置（基础配置 + 环境合并）
├── dev.ts             # 开发环境构建配置
├── prod.ts            # 生产环境构建配置
├── env.ts             # 环境变量统一导出（运行时使用）
├── env.dev.ts         # 开发环境变量
└── env.prod.ts        # 生产环境变量
```

## 🔧 配置文件说明

### 1. Taro 构建配置

#### `index.ts` - 主配置文件
- 基础配置（框架、编译器、平台配置等）
- 根据 `NODE_ENV` 自动合并 dev 或 prod 配置
- 配置 webpack chain、插件等

#### `dev.ts` - 开发环境配置
- 开发服务器配置
- 日志输出配置
- 开发环境特有的 defineConstants

#### `prod.ts` - 生产环境配置
- 生产构建优化
- 代码压缩混淆
- 性能分析插件（可选）

### 2. 环境变量配置

#### `env.dev.ts` / `env.prod.ts` - 环境变量
定义不同环境的变量：
- API 地址
- 超时配置
- 调试开关
- CDN 地址
- WebSocket 地址等

#### `env.ts` - 统一导出
自动根据 `NODE_ENV` 选择对应环境配置，提供给应用运行时使用。

## 📝 使用方式

### 在构建时使用（defineConstants）

通过 `defineConstants` 注入，会在编译时替换为常量：

```typescript
// config/dev.ts
export default {
  defineConstants: {
    'process.env.API_BASE_URL': JSON.stringify('https://dev-api.example.com'),
    'process.env.DEBUG': true,
  }
}

// 应用代码中直接使用
console.log(process.env.API_BASE_URL)  // 'https://dev-api.example.com'
console.log(process.env.DEBUG)         // true
```

### 在运行时使用（推荐）

通过导入 `env.ts` 使用，支持类型提示：

```typescript
// 方式1：导入完整配置对象
import { ENV } from '@/config/env'

console.log(ENV.API_BASE_URL)
console.log(ENV.DEBUG)

// 方式2：使用平台判断
import { isH5, isRN, isWeapp } from '@/config/env'

if (isRN) {
  // RN 特有逻辑
}
```

## 🌍 环境变量列表

### 开发环境 (`env.dev.ts`)
| 变量名 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| `ENV_NAME` | string | 环境名称 | 'development' |
| `API_BASE_URL` | string | API 基础地址 | 'https://dev-api.example.com' |
| `API_TIMEOUT` | number | API 超时（毫秒） | 30000 |
| `DEBUG` | boolean | 调试模式 | true |
| `ENABLE_MOCK` | boolean | Mock 数据开关 | false |
| `LOG_LEVEL` | string | 日志级别 | 'debug' |
| `CDN_URL` | string | CDN 地址 | 'https://dev-cdn.example.com' |
| `WS_URL` | string | WebSocket 地址 | 'wss://dev-ws.example.com' |
| `ASSET_VERSION` | string | 资源版本号 | '1.0.0' |

### 生产环境 (`env.prod.ts`)
与开发环境相同结构，但值不同（如调试关闭、超时更短等）

## 🎯 最佳实践

### 1. 敏感信息处理

对于 API Key、密钥等敏感信息：

```typescript
// ❌ 不要直接写在代码中
export const API_KEY = 'sk_live_xxxxx'

// ✅ 使用环境变量
export const API_KEY = process.env.API_KEY || ''
```

然后在 CI/CD 中配置真实的 `API_KEY`。

### 2. 多环境扩展

如果需要更多环境（如测试环境 test、预发布环境 staging）：

```bash
# 创建新的环境配置
config/
├── env.test.ts        # 测试环境
├── env.staging.ts     # 预发布环境
```

修改 `env.ts`：

```typescript
const envMap = {
  development: require('./env.dev').ENV_CONFIG,
  test: require('./env.test').ENV_CONFIG,
  staging: require('./env.staging').ENV_CONFIG,
  production: require('./env.prod').ENV_CONFIG,
}

const currentEnv = process.env.APP_ENV || process.env.NODE_ENV || 'development'
export const ENV = envMap[currentEnv]
```

### 3. 平台特定配置

如果某些配置只在特定平台使用：

```typescript
import { PLATFORM } from '@/config/env'

const platformConfig = {
  h5: { /* H5 特有配置 */ },
  weapp: { /* 小程序特有配置 */ },
  rn: { /* RN 特有配置 */ },
}

export const config = platformConfig[PLATFORM] || {}
```

### 4. 类型安全

使用 TypeScript 类型确保配置正确：

```typescript
// env.dev.ts
export const ENV_CONFIG = {
  API_BASE_URL: 'https://dev-api.example.com',
  DEBUG: true,
} as const

export type EnvConfig = typeof ENV_CONFIG

// 确保所有环境配置结构一致
// env.prod.ts 必须实现相同的 EnvConfig 类型
```

## ⚠️ 注意事项

1. **不要提交敏感信息**
   - 使用 `.gitignore` 忽略包含密钥的文件
   - 在 CI/CD 中配置环境变量

2. **构建时 vs 运行时**
   - `defineConstants` 是构建时替换，打包后无法修改
   - 如需运行时动态配置，使用导入方式

3. **类型安全**
   - 始终为配置提供 TypeScript 类型
   - 使用 `as const` 确保值不可变

4. **平台差异**
   - 注意不同平台的 API 支持差异
   - 使用条件编译或运行时判断

## 📚 相关文档

- [Taro 配置详解](https://taro-docs.jd.com/docs/config)
- [Taro 环境变量](https://taro-docs.jd.com/docs/env-mode-config)
- [Webpack DefinePlugin](https://webpack.js.org/plugins/define-plugin/)
