## 💾 Efw 框架文件上传处理总结

Efw 框架的文件上传处理是通过多个组件协作实现的，涵盖了从**客户端的请求构建**到**服务器端的严格安全检查和持久化**的整个过程。此处理不同于常规的事件处理，而是通过一个专用的 Servlet（`uploadServlet`）完成的。

---

### 1. 客户端的角色: `efw.client.js`

`efw.client.js` 负责专门的文件上传处理，独立于常规的事件执行 (`fire`)。

| 角色 | 说明 |
| :--- | :--- |
| **请求准备** | 执行触发文件上传的函数，例如 `Efw.prototype.upload`。此过程构建包含文件数据的 **`multipart/form-data`** 请求。 |
| **参数附加** | 除文件主体外，还将服务器端处理所需的元数据（如 `cmd`、`id`、`target`、`home`、`isAbs`，以及 elFinder 的路径数组 `upload_path[]` 等）作为表单数据附加。 |
| **发送目标** | 构建的请求直接发送到专用于二进制数据处理的 **`/uploadServlet`**，而不是通用的 `efwServlet`。 |

---

### 2. 服务器端的角色: 接收与安全层 (`uploadServlet.java`)

`uploadServlet.java` 是接收文件数据的专用网关，负责管理安全和 I/O。

#### 🛡️ 严格的安全检查（Java）

对于文件上传这一高风险操作，Java 端在**解析请求之前**执行以下安全检查：

1.  **登录检查**: 检查 Session 的 `loginKey`，拒绝来自未登录用户的上传。
2.  **授权检查**: 基于用户的权限设置（`authKey`），**只接受**拥有**上传许可权限**（`uploadable="true"`）的用户的上传。
3.  **路径风险检查**: 检查上传路径和文件名中是否含有 **`..`**（路径回溯）或非法目录字符（`\`、`/`），以排除目录遍历等风险。

#### ⚙️ 文件 I/O 与管理

* **临时存储**: 读取接收到的文件数据，对文件名进行风险检查后，将其作为安全的**临时文件**（`efw#####.tmp`）保存在服务器上。
* **管理注册**: 调用 **`FileManager.keepUploadFile`**，将上传的文件名和临时文件路径注册到框架的管理之下，从而允许 JavaScript 进行操作。
* **处理委托**: 对于 elFinder 集成，在 I/O 完成后，调用 **`ScriptManager.callFunction("elfinder_upload", ...)`**，将持久化的业务逻辑委托给 JavaScript。

---

### 3. 服务器端的角色: 持久化与逻辑层 (JS)

此层负责将临时保存的文件移动到永久位置，并进行与事件处理相关的文件的清理。

#### A. 通过 elFinder 集成进行持久化 (`elfinder_upload.js`)

此函数由 `uploadServlet` 调用，负责文件上传的最终逻辑。

* **最终风险检查**: JavaScript 端再次执行 `elfinder_checkRisk`，实现双重安全保障。
* **目标解码**: 解码 elFinder 特有的 Base64 编码的目标路径，以确定保存的目标文件夹（`targetFolder`）。
* **执行持久化**: 调用 **`file.saveUploadFiles(targetFolder)`**，将由 `FileManager` 管理的临时文件移动（或复制）到指定的永久文件夹。

#### B. 事件处理后的清理 (`efw.js` / `efw.server.js`)

当文件上传伴随常规事件处理流程时，文件由 `FileManager` 管理。

* **自动删除**: 在 `efw.js` 的 `doPost` 方法的 `finally` 块中，会调用 **`Packages.efw.file.FileManager.removeUploadFiles()`**。
* **作用**: 这确保了在事件处理过程中**未被持久化**（或未被 `elfinder_upload` 等明确移动）的临时文件，在**请求完成后能可靠地从服务器上删除**，从而防止磁盘空间浪费和安全风险。

---

### 📊 文件上传处理的角色分工

| 组件 | 执行环境 | 主要角色 |
| :--- | :--- | :--- |
| **`efw.client.js`** | 客户端 (浏览器) | 请求构建（`multipart/form-data`），发送到 `/uploadServlet`。 |
| **`uploadServlet.java`** | 服务器 (Java) | **安全屏障**（登录、授权、路径检查）、I/O 控制、**临时文件保存**。 |
| **`elfinder_upload.js`** | 服务器 (JavaScript) | 目标路径解码、**将临时文件移动到永久文件夹**。 |
| **`efw.js` / `FileManager`**| 服务器 (JS/Java) | 请求结束后的**临时文件自动删除**（清理）。 |
