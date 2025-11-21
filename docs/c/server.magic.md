## 🚀 Efw 框架服务器端处理流程的总体分析

本文将整合所提供的四个主要源文件（`efwServlet.java`、`ScriptManager.java`、服务器端`efw.js`和`efw.server.js`），对 **Efw 框架的服务器端处理流程**进行全面分析。

Efw 框架的服务器端是一个**事件驱动型中间件**，它接收从客户端 `Efw("eventId")` 调用开始的 AJAX/WebSocket 请求。它通过 Java 和服务器端 JavaScript 的强大协作，集成了身份验证、验证、逻辑执行和资源管理。

---

### 1. 网关层：`efwServlet.java`

`efwServlet` 是接收来自客户端所有 Web 事件请求的**唯一调度器（Dispatcher）**。

| 角色 | 说明 |
| :--- | :--- |
| **初始化** | 通过 `loadOnStartup=1` 在启动时初始化整个框架（`framework.initServlet`）。 |
| **请求接收** | 读取来自客户端的 POST 请求（JSON 数据）。 |
| **错误控制** | 在初始化失败或发生 Java 级别错误时，返回预设的 JSON 错误响应。 |
| **处理委托** | 将读取到的 JSON 字符串传递给 **`ScriptManager.doPost()`**，委托 JavaScript 环境进行处理。 |
| **资源清理** | 在 `finally` 块中，删除线程本地的上下文信息（语言、日志等），确保**线程安全**。 |

---

### 2. 执行引擎层：`ScriptManager.java`

`ScriptManager` 是用于执行服务器端 JavaScript 的抽象**引擎管理层**。

| 角色 | 说明 |
| :--- | :--- |
| **引擎选择** | 根据配置（`efw.script.engine`），动态加载 Nashorn 或 GraalJS 等具体的 JavaScript 执行环境，并进行抽象化（`ScriptEngine4Efw`）。 |
| **执行控制** | 将从 `efwServlet` 传递的 JSON 委托给 `_se.doPost(req)`，从而在 JavaScript 环境中启动事件处理。 |
| **并发控制** | 提供 **`ReentrantLock`**（用于文件 I/O）和按事件 ID划分的 **`Semaphore`**（用于限制并发执行数），实现在多线程环境下的安全资源利用和服务质量 (QoS) 控制。 |

---

### 3. 核心逻辑层：`efw.js` (服务器端)

这是由 `ScriptManager` 加载的框架基础库，作为 JavaScript 环境的**全局上下文**运行。

| 角色 | 说明 |
| :--- | :--- |
| **入口点** | `Efw.prototype.doPost(req)` 是从 Java 进入 JavaScript 环境的**正式入口**。 |
| **阶段判断** | 根据请求 JSON 中 `params` 的存在与否，判断是**参数格式获取阶段** (`params==null`) 还是**事件执行阶段** (`params!=null`)，并进行处理分支。 |
| **安全性** | 在调试模式下，进行**全局污染检查**，警告开发人员是否存在意外的变量定义。 |
| **资源管理** | 在事件执行后，通过 `finally` 块临时删除上传文件并释放信号量。 |
| **功能委托** | 实际的身份验证、验证和执行处理委托给 `EfwServer` 实例（`efw.server`）。 |

---

### 4. 安全和服务层：`efw.server.js`

由 `efw.js` 调用，负责事件执行所需的预处理和后处理。

| 功能 | 方法 | 详细信息 |
| :--- | :--- | :--- |
| **登录** | `checkLogin` | 检查会话中是否存在登录密钥。如果会话过期，则指示导航至 `loginUrl`。 |
| **授权** | `checkAuth` | 检查用户的权限值和事件 ID 是否与设定的模式匹配。如果没有权限，则转入系统错误。 |
| **验证** | `checkStyle` | **服务器端验证的核心**。基于 `event.paramsFormat` 递归检查必填项、类型转换、最大长度、min/max 范围、禁用字符以及加密/解密。**成功后，将请求值转换为适当的类型（Date, Number）并覆盖**。 |
| **执行** | `fire` | 携带已验证的参数，最终执行用户定义的**事件脚本（`event.fire`）**。 |
| **事务** | `fire` (`try/catch/finally`) | 根据事件执行的成功与否，执行 **`db._commitAll()`** 或 **`db._rollbackAll()`**，管理事务。 |
| **特殊动作** | `fire` | 如果包含 `actions.download` 或 `actions.preview`，则将文件信息保存在会话中，以便由专门的 Servlet 单独处理。 |

---

## 📝 服务器处理的集成流程总结

客户端的事件请求会遵循以下清晰的多层结构进行处理：

- **Java I/O (Servlet):** 接收请求、读取 JSON、Java → JavaScript 的入口。
- **Java 引擎 (ScriptManager):** 设置 JavaScript 执行环境、并发控制、启动执行。
- **JS 框架 (efw.js):** 解析请求、判断阶段、资源管理、安全挂钩。
- **JS 安全/验证 (efw.server.js):** **登录** → **授权** → **验证和类型转换**。
- **JS 事件脚本:** 执行核心业务逻辑（例如数据库访问）。
- **JS/Java 清理:** 事务处理、资源释放、国际化响应 JSON 并返回。

通过这种结构，Efw 框架将业务逻辑与基础设施（安全、I/O、并发处理）明确分离，从而实现了健壮的企业级应用开发。
