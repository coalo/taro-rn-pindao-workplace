# WebView 集成说明文档

## 概述
在工作页面（`src/pages/work/index.tsx`）中集成了 WebView 模块，用于展示 H5 开发的子系统列表。

## 功能特性

### 1. **内嵌 HTML 子系统列表**
- 使用内联 HTML 方式展示 6 个子系统
- 包含图标、标题、描述信息
- 支持点击交互

### 2. **子系统列表**
包含以下示例子系统：
- 客户管理系统 👥
- 订单管理系统 📋
- 库存管理系统 📦
- 财务管理系统 💰
- 人事管理系统 👔
- 数据分析系统 📊

### 3. **RN 与 H5 通信**
- H5 通过 `window.ReactNativeWebView.postMessage()` 向 RN 发送消息
- RN 通过 `onMessage` 监听接收 H5 消息
- 点击子系统时弹出确认对话框

## 使用方式

### 加载远程 H5 页面
如果你有实际的 H5 子系统列表页面，可以修改 `webViewSource`：

```typescript
// 将内嵌 HTML 改为远程 URL
const webViewSource = { uri: 'https://your-domain.com/subsystems' }
```

### 修改子系统数据
在 HTML 内容的 `subsystems` 数组中修改：

```javascript
const subsystems = [
    { 
        id: 1, 
        name: '你的系统名称', 
        desc: '系统描述', 
        icon: '🎯', 
        color: '#1890ff', 
        url: 'https://your-system.com' 
    },
    // 添加更多...
];
```

### 处理跳转逻辑
在 `handleMessage` 函数中自定义跳转行为：

```typescript
const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data)
    
    if (data.type === 'navigate') {
        // 方式1: 使用 Taro 路由跳转到其他页面
        // Taro.navigateTo({ url: '/pages/detail/index?url=' + data.data.url })
        
        // 方式2: 在当前 WebView 中加载新 URL
        // setWebViewSource({ uri: data.data.url })
        
        // 方式3: 打开外部浏览器
        // Linking.openURL(data.data.url)
    }
}
```

## 文件结构

```
src/pages/work/
├── index.tsx         # WebView 主文件
├── index.scss        # 样式文件
└── index.config.ts   # 页面配置
```

## WebView 配置说明

- `javaScriptEnabled`: 允许执行 JavaScript
- `domStorageEnabled`: 允许 DOM 存储（localStorage等）
- `scalesPageToFit`: 启用页面缩放适配
- `startInLoadingState`: 显示加载指示器
- `onMessage`: 接收 H5 发送的消息
- `onError`: 错误处理
- `onLoad`: 加载完成回调

## 注意事项

1. **网络权限**：确保应用有网络访问权限
2. **HTTPS**：生产环境建议使用 HTTPS
3. **性能优化**：复杂页面建议使用远程 URL 而非内嵌 HTML
4. **安全性**：处理 H5 消息时注意数据验证
5. **调试**：可以通过 Chrome DevTools 调试 WebView 内容

## 后续优化建议

1. 添加下拉刷新功能
2. 添加搜索功能
3. 支持子系统分类
4. 添加收藏功能
5. 缓存机制优化
6. 离线访问支持

## 运行和测试

```bash
# 重新构建
yarn build:rn

# 启动 iOS
yarn ios

# 启动 Android
yarn android
```
