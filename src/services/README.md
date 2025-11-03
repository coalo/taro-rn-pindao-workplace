# Services

API 请求和业务服务层，用于封装后端接口调用和业务逻辑。

## 目录结构

```
services/
├── README.md           # 说明文档
├── index.ts           # 统一导出
├── request.ts         # 请求封装（基于 Taro.request）
├── user.ts            # 用户相关服务（示例）
└── auth.ts            # 认证相关服务（示例）
```

## 命名规范

- 按业务模块划分文件（如 `user.ts`、`order.ts`、`product.ts`）
- 使用小驼峰命名法（camelCase）
- 服务函数名应清晰表达业务含义

## 使用示例

```typescript
// 导入单个服务
import { getUserInfo, updateUserProfile } from '@/services/user'

// 或从统一入口导入
import { getUserInfo, login, logout } from '@/services'

function MyComponent() {
  const fetchData = async () => {
    try {
      const userInfo = await getUserInfo('123')
      console.log(userInfo)
    } catch (error) {
      console.error('请求失败:', error)
    }
  }
  
  return <View>...</View>
}
```

## 开发规范

### 1. 类型安全
所有服务函数必须提供完整的 TypeScript 类型定义：

```typescript
// 定义请求参数类型
export interface LoginParams {
  username: string
  password: string
}

// 定义响应数据类型
export interface LoginResponse {
  token: string
  userInfo: UserInfo
}

// 服务函数
export async function login(params: LoginParams): Promise<LoginResponse> {
  return request<LoginResponse>({
    url: '/api/auth/login',
    method: 'POST',
    data: params
  })
}
```

### 2. 错误处理
统一的错误处理机制：

```typescript
export async function getUserInfo(userId: string) {
  try {
    const response = await request({
      url: `/api/users/${userId}`,
      method: 'GET'
    })
    return response
  } catch (error) {
    // 可以在这里添加特定的错误处理逻辑
    console.error('获取用户信息失败:', error)
    throw error
  }
}
```

### 3. 请求拦截
在 `request.ts` 中配置统一的请求/响应拦截器：

- 添加 token 认证
- 统一错误提示
- 请求/响应日志
- 超时处理

### 4. 环境配置
根据不同环境使用不同的 API 地址：

```typescript
import { API_BASE_URL } from '@/constants/api'

const baseURL = API_BASE_URL // 从常量中读取
```

## 服务分类

### 认证服务（auth.ts）
- `login()` - 用户登录
- `logout()` - 用户登出
- `refreshToken()` - 刷新 token
- `register()` - 用户注册

### 用户服务（user.ts）
- `getUserInfo()` - 获取用户信息
- `updateUserProfile()` - 更新用户资料
- `changePassword()` - 修改密码
- `uploadAvatar()` - 上传头像

### 其他业务服务
根据项目需求创建对应的服务模块

## 注意事项

1. **跨端兼容**：使用 Taro.request 确保多端兼容（H5、RN、小程序）
2. **请求取消**：对于可能重复的请求，考虑实现请求取消机制
3. **缓存策略**：对于不常变化的数据，可以实现缓存机制
4. **安全性**：
   - 敏感信息加密传输
   - Token 安全存储
   - 防止 CSRF 攻击
5. **性能优化**：
   - 合理使用并发请求
   - 避免重复请求
   - 实现请求防抖/节流

## 与 Hooks 配合使用

推荐与 `@/hooks/useAsync` 配合使用：

```typescript
import { useAsync } from '@/hooks'
import { getUserInfo } from '@/services'

function UserProfile() {
  const { data, loading, error, execute } = useAsync(getUserInfo)
  
  useEffect(() => {
    execute('123')
  }, [])
  
  if (loading) return <Loading />
  if (error) return <Error message={error.message} />
  
  return <View>{data?.name}</View>
}
```

## API 文档
建议在每个服务文件顶部添加对应后端 API 文档的链接，方便维护。
