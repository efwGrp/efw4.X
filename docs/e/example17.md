# efw WebSocket Mode Function Example

## Overview

The efw framework provides WebSocket mode support, implementing real-time communication, progress feedback, and broadcast functionality. This example demonstrates how to use WebSocket mode for efficient client-server communication, including progress display and real-time message broadcasting.

## Core Files

1. **WebSocket Mode Test Main Page**: `helloWsMode.jsp`
2. **Progress Test Function**: `helloWsMode_progress_test.js`
3. **Broadcast Start Function**: `helloWsMode_broadcast_start.js`
4. **Broadcast Stop Function**: `helloWsMode_broadcast_stop.js`
5. **Broadcast Receive Function**: `helloWsMode_broadcast_receive.js`
6. **Broadcast Stop Receive Function**: `helloWsMode_broadcast_bye.js`

## Feature Description

### 1. WebSocket Mode Advantages

#### Real-time Communication
- **Bidirectional Communication**: Clients and servers can exchange messages in real-time
- **Low Latency**: Messages arrive instantly without polling
- **Persistent Connection**: Maintains long-lived connections, reducing connection establishment overhead

#### Progress Feedback
```javascript
// Send progress update
efw.wsSend(new Result().progress("Processing...", 50));

// Complete progress
efw.wsSend(new Result().progress("Complete", 100, true));
```

### 2. Data Storage Scope

| Storage Type     | WebSocket Mode          | Normal Mode          | Application Scenarios               |
|------------------|-------------------------|---------------------|-------------------------------------|
| **Session Storage** | ✅ Read/Write Support   | ✅ Read/Write Support | User session data, login status, etc. |
| **Cookie Storage**  | ✅ Read Support<br>❌ Write Invalid | ✅ Read/Write Support | -                                   |
| **Context Storage** | ✅ Global Sharing       | ✅ Global Sharing     | Broadcast messages, global configuration, shared data |

> **Note**: WebSocket connections cannot set HTTP Cookies

### 3. Broadcast Mechanism Principle

#### Broadcast Process
1. **Broadcaster** writes messages to Context
2. **Receiver** periodically reads messages from Context
3. WebSocket pushes messages to each client

#### Code Example
```javascript
// Broadcaster sets content
context.set("broadcast_content", "Real-time message");

// Receiver reads content
var message = context.get("broadcast_content");
```

#### Application Scenarios
- **Long-running Task Processing**
```javascript
  // Batch data processing progress
  // Complex calculation task progress feedback
```
  
- **Real-time Applications**
```javascript
  // Chat room message broadcasting
  // Real-time data monitoring dashboard
  // Multi-user collaborative editing notifications
  // Real-time stock quote pushing
```

- **Task Monitoring**
```javascript
  // Background task status monitoring
  // System resource monitoring
  // Real-time log viewing
```

## Best Practices

### 1. Error Handling
> The `efw.wsSend` function does not throw exceptions, only determines success through return values (considering possible client disconnections)

### 2. Resource Cleanup
```javascript
// Clean up resources when stopping broadcast
context.set("broadcast_status", "false");
context.remove("broadcast_content");

// Clean up status when stopping reception
session.set("receive_status", "false");
```

### 3. Performance Optimization
```java
// Control message frequency to avoid excessive WebSocket messages
java.lang.Thread.sleep(1000); // Update once per second
```

## Considerations

### 1. Browser Compatibility
- Modern browsers support WebSocket
- Need to check browser support
- Provide fallback solution (normal mode)

### 2. Connection Management
- Automatic disconnection when browser closes
- Framework automatically reconnects on network exceptions (up to 10 times)
- Connection timeout: 20 seconds

### 3. Security
- Recommended to use `wss://` secure protocol
- Security configuration methods are consistent with efw events

> This example comprehensively demonstrates the WebSocket mode functionality of the efw framework, including advanced features such as real-time progress feedback and message broadcasting, suitable for modern web application scenarios requiring real-time communication.
