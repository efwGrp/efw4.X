# efw WebSocket 模式功能示例

## 概述

efw 框架提供 WebSocket 模式支持，实现了实时通信、进度反馈和广播功能。本示例展示如何使用 WebSocket 模式进行高效的客户端-服务器通信，包括进度显示和实时消息广播。

## 核心文件

1. **WebSocket 模式测试主页面**: `helloWsMode.jsp`
2. **进度测试功能**: `helloWsMode_progress_test.js`
3. **广播启动功能**: `helloWsMode_broadcast_start.js`
4. **广播停止功能**: `helloWsMode_broadcast_stop.js`
5. **广播接收功能**: `helloWsMode_broadcast_receive.js`
6. **广播停止接收功能**: `helloWsMode_broadcast_bye.js`

## 功能特性说明

### 1. WebSocket 模式优势

#### 实时通信
- **双向通信**：客户端和服务器可实时互发消息
- **低延迟**：消息即时到达，无需轮询
- **连接持久**：保持长连接，减少连接建立开销

#### 进度反馈
```javascript
// 发送进度更新
efw.wsSend(new Result().progress("处理中...", 50));

// 完成进度
efw.wsSend(new Result().progress("完成", 100, true));
```

### 2. 数据存储作用域

| 存储类型       | WebSocket 模式          | 普通模式          | 适用场景                     |
|----------------|-------------------------|-------------------|------------------------------|
| **Session 存储** | ✅ 读写支持             | ✅ 读写支持       | 用户会话数据、登录状态等     |
| **Cookie 存储** | ✅ 读取支持<br>❌ 设置无效 | ✅ 读写支持       | -                            |
| **Context 存储**| ✅ 全局共享             | ✅ 全局共享       | 广播消息、全局配置、共享数据 |

> **注**：WebSocket 连接无法设置 HTTP Cookie

### 3. 广播机制原理

#### 广播流程
1. **广播器**将消息写入 Context
2. **接收器**定期从 Context 读取消息
3. WebSocket 将消息推送到各个客户端

#### 代码示例
```javascript
// 广播器设置内容
context.set("broadcast_content", "实时消息");

// 接收器读取内容
var message = context.get("broadcast_content");
```

#### 使用场景
- **长时间任务处理**
```javascript
  // 批量数据处理进度
  // 复杂计算任务进度反馈
```
  
- **实时应用**
```javascript
  // 聊天室消息广播
  // 实时数据监控面板
  // 多人协作编辑通知
  // 股票行情实时推送
```

- **任务监控**
```javascript
  // 后台任务状态监控
  // 系统资源监控
  // 日志实时查看
```

## 最佳实践

### 1. 错误处理
> `efw.wsSend`函数不抛出异常，仅通过返回值判断是否成功（考虑客户端可能关闭的情况）

### 2. 资源清理
```javascript
// 停止广播时清理资源
context.set("broadcast_status", "false");
context.remove("broadcast_content");

// 停止接收时清理状态
session.set("receive_status", "false");
```

### 3. 性能优化
```java
// 控制消息频率，避免过多 WebSocket 消息
java.lang.Thread.sleep(1000); // 每秒更新一次
```

## 注意事项

### 1. 浏览器兼容性
- 现代浏览器均支持 WebSocket
- 需检查浏览器支持情况
- 提供降级方案（普通模式）

### 2. 连接管理
- 浏览器关闭时自动断开连接
- 网络异常时框架自动重连（最多10次）
- 连接超时时间：20秒

### 3. 安全性
- 建议使用 `wss://` 安全协议
- 安全设置方法与 efw 事件一致

> 本示例完整展示了 efw 框架的 WebSocket 模式功能，包括实时进度反馈和消息广播等高级特性，适用于需要实时通信的现代 Web 应用场景。