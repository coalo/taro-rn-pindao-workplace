# Hooks

自定义 React Hooks 目录，用于封装可复用的状态逻辑和副作用。

## 目录结构

```
hooks/
├── README.md           # 说明文档
├── index.ts           # 统一导出
├── useAsync.ts        # 异步请求 Hook（示例）
├── useDebounce.ts     # 防抖 Hook（示例）
└── useThrottle.ts     # 节流 Hook（示例）
```

## 命名规范

- 所有 Hook 文件必须以 `use` 开头（如 `useCounter.ts`）
- 使用小驼峰命名法（camelCase）
- Hook 函数名与文件名保持一致

## 使用示例

```typescript
// 导入单个 Hook
import { useDebounce } from '@/hooks/useDebounce'

// 或从统一入口导入
import { useDebounce, useAsync } from '@/hooks'

function MyComponent() {
  const debouncedValue = useDebounce(inputValue, 500)
  
  return <View>...</View>
}
```

## 开发规范

1. **类型安全**：所有 Hook 必须提供完整的 TypeScript 类型定义
2. **依赖声明**：正确声明 useEffect/useCallback 等的依赖数组
3. **文档注释**：每个 Hook 应包含 JSDoc 注释说明用途、参数和返回值
4. **单一职责**：每个 Hook 专注于解决一个特定问题
5. **可测试性**：编写可独立测试的纯逻辑 Hook

## 常见 Hook 分类

### 状态管理类
- `useToggle` - 布尔值切换
- `useCounter` - 计数器
- `useLocalStorage` - 本地存储同步

### 性能优化类
- `useDebounce` - 防抖
- `useThrottle` - 节流
- `useMemoizedCallback` - 记忆化回调

### 副作用类
- `useAsync` - 异步请求
- `useInterval` - 定时器
- `useEventListener` - 事件监听

### 平台适配类
- `usePlatform` - 平台判断
- `useResponsive` - 响应式布局
- `useSafeArea` - 安全区域

## 注意事项

1. **跨端兼容**：注意 RN 和 H5 的 API 差异，必要时使用条件编译
2. **性能考虑**：避免在 Hook 中进行大量计算或频繁触发渲染
3. **清理副作用**：在 useEffect 中正确清理定时器、订阅等
4. **避免过度抽象**：只在逻辑真正需要复用时才抽象为 Hook
