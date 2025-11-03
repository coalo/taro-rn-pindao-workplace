# Constants 业务常量目录

该目录用于存放项目中使用的所有业务相关常量定义，便于统一管理和维护。

> **注意**：设计系统相关的常量（颜色、间距、字体等 Design Tokens）请使用 `@/styles/tokens`

## 📁 目录结构

```
constants/
├── index.ts        # 统一导出文件
├── common.ts       # 通用业务常量
├── api.ts          # API 相关常量
└── README.md       # 说明文档
```

## 📝 文件说明

### common.ts - 通用业务常量

包含应用的通用配置和业务常量：

```typescript
import { 
  PAGE_PATHS,        // 页面路径
  TAB_BAR_LIST,      // TabBar 配置
  STORAGE_KEYS,      // 本地存储 key
  USER_ROLES,        // 用户角色
  USER_STATUS,       // 用户状态
  APP_CONFIG,        // 应用配置
  PAGINATION,        // 分页配置
  LANGUAGES,         // 语言选项
  THEMES,            // 主题选项
} from '@/constants/common'
```

### api.ts - API 相关常量

包含 API 请求相关的配置和常量：

```typescript
import {
  API_CONFIG,        // API 基础配置（URL、超时等）
  HTTP_STATUS,       // HTTP 状态码
  BUSINESS_CODE,     // 业务状态码
  API_ENDPOINTS,     // API 端点
  HTTP_METHOD,       // 请求方法
  REQUEST_HEADERS,   // 请求头
} from '@/constants/api'
```

## 💡 使用方式

### 导入所有常量
```typescript
import * from '@/constants'
```

### 导入特定常量
```typescript
import { PAGE_PATHS, API_CONFIG, STORAGE_KEYS } from '@/constants'
```

### 导入单个文件
```typescript
import { API_ENDPOINTS } from '@/constants/api'
import { USER_ROLES } from '@/constants/common'
```

## 📋 使用示例

### 页面跳转
```typescript
import Taro from '@tarojs/taro'
import { PAGE_PATHS } from '@/constants'

Taro.navigateTo({ url: PAGE_PATHS.MINE })
```

### 本地存储
```typescript
import Taro from '@tarojs/taro'
import { STORAGE_KEYS } from '@/constants'

Taro.setStorageSync(STORAGE_KEYS.TOKEN, 'xxx')
const token = Taro.getStorageSync(STORAGE_KEYS.TOKEN)
```

### API 请求
```typescript
import { API_CONFIG, API_ENDPOINTS, HTTP_METHOD } from '@/constants'

const response = await Taro.request({
  url: `${API_CONFIG.BASE_URL}${API_ENDPOINTS.USER_INFO}`,
  method: HTTP_METHOD.GET,
  timeout: API_CONFIG.TIMEOUT,
})
```

### 状态码判断
```typescript
import { HTTP_STATUS, BUSINESS_CODE } from '@/constants'

if (response.statusCode === HTTP_STATUS.OK) {
  if (response.data.code === BUSINESS_CODE.SUCCESS) {
    // 处理成功
  } else if (response.data.code === BUSINESS_CODE.TOKEN_EXPIRED) {
    // Token 过期
  }
}
```

## 🎨 设计系统 vs 业务常量

### ❌ 不要放在这里

这些属于设计系统，应该放在 `@/styles/tokens`：
- 颜色（colors）
- 间距（spacing）
- 字体（typography）
- 圆角（radius）
- 阴影（shadows）
- 层级（zIndex）

```typescript
// ❌ 错误：不要在 constants 中定义设计令牌
import { THEME_COLORS } from '@/constants'  // 错误

// ✅ 正确：从 styles/tokens 导入设计令牌
import { colors } from '@/styles/tokens'  // 正确
```

### ✅ 应该放在这里

这些属于业务逻辑，应该放在 `@/constants`：
- 页面路径
- API 配置
- 存储 key
- 业务状态码
- 用户角色/状态
- 应用配置
- 分页配置

## 📐 最佳实践

1. **语义化命名**
   ```typescript
   // ✅ 推荐
   export const STORAGE_KEYS = { TOKEN: 'token' }
   
   // ❌ 不推荐
   export const SK = { T: 'token' }
   ```

2. **使用对象分组**
   ```typescript
   // ✅ 推荐：按功能分组
   export const USER_ROLES = {
     ADMIN: 'admin',
     USER: 'user',
   }
   
   // ❌ 不推荐：单独定义
   export const ADMIN_ROLE = 'admin'
   export const USER_ROLE = 'user'
   ```

3. **使用大写和下划线**
   ```typescript
   // ✅ 推荐
   export const API_BASE_URL = 'https://api.example.com'
   
   // ❌ 不推荐
   export const apiBaseUrl = 'https://api.example.com'
   ```

4. **添加注释说明**
   ```typescript
   // ✅ 推荐
   /** 请求超时时间（毫秒） */
   export const REQUEST_TIMEOUT = 10000
   ```

5. **避免魔法数字和字符串**
   ```typescript
   // ✅ 推荐
   import { HTTP_STATUS } from '@/constants'
   if (code === HTTP_STATUS.OK) {}
   
   // ❌ 不推荐
   if (code === 200) {}
   ```

## ⚠️ 注意事项

1. **不要包含环境变量** - 使用 `process.env` 直接访问
2. **不要包含动态值** - 常量应该是静态的
3. **不要包含函数** - 函数应该放在 `utils` 目录
4. **不要包含类型定义** - 类型应该放在 `types` 目录
5. **保持跨端兼容** - 常量应该在所有端都可用

## 🔗 相关目录

- [`@/styles/tokens`](../styles/tokens/) - 设计系统令牌（颜色、间距、字体等）
- [`@/utils`](../utils/) - 工具函数
- [`@/types`](../types/) - 类型定义
- [`@/config`](../../config/) - 构建配置
