所提供的 **`previewServlet.java`** 是一个专用的 Servlet，用于在 Efw 框架中实现**服务器端的文件预览功能**。

此 Servlet 的目的是让文件无需客户端下载，即可直接在浏览器内显示。其处理流程重点关注安全性和文件大小限制。

---

## 🖼️ 对 `previewServlet.java` 的分析：文件预览处理

### 1. 作用和调用方法

* **作用**: 从 Session 中读取服务器端事件处理（JavaScript）指定的预览文件，设置 MIME 类型，并将其直接写入 HTTP 响应流中，从而使浏览器**以内嵌方式**（预览）显示文件。
* **注解**: 通过 `@WebServlet(name="previewServlet", urlPatterns={"/previewServlet"})` 作为专用 URL 终端（Endpoint）运行。
* **HTTP 方法**: 仅由 `doGet` 处理。客户端通常通过 JavaScript 向此 URL 发送请求。

### 2. 处理流程 (`doGet`)

#### A. 获取预览信息和清除 Session

1.  **从 Session 获取**: 从 **`HttpSession`** 中获取待预览文件的路径（`EFW_PREVIEW_FILE`）以及该路径是否为绝对路径（`EFW_PREVIEW_ISABS`）。
2.  **立即删除**: 获取信息后，出于安全和防止二次使用的目的，**立即删除 Session 属性**（`sn.removeAttribute`）。这降低了多次请求同一文件或外部非法访问的风险。

#### B. 严格的文件检查

在访问文件之前，执行以下检查：

1.  **路径存在性检查**: 如果 Session 属性不存在或为空，则返回错误。
2.  **文件实际存在性检查**:
    * 将文件路径与 `framework.getStorageFolder()` 结合（如果是绝对路径则直接使用）创建 **`File`** 对象。
    * 检查 **`!fl.exists()||!fl.isFile()`**，如果指定文件不存在或是目录，则返回错误。
3.  **MIME 类型检查**:
    * 使用 **`FileManager.getMimeTypeByFileName(fl.getName())`** 获取 MIME 类型。
    * 如果 MIME 类型为 `"unknown"`，则返回错误，表明文件不可预览（拒绝可能导致浏览器无法安全显示的文件类型）。
4.  **大小限制检查**:
    * 如果**文件大小超过 10MB ($10 \times 1024 \times 1024$ 字节)**，则返回错误。这是为了减轻服务器的内存负载，并防止由于预览大文件而导致的客户端性能下降。

#### C. 文件读取和响应

1.  **设置 Content Type**: 将获取到的 `mimeType` 设置到 **`response.setContentType(mimeType)`** 中。这会促使浏览器尝试**内嵌（Inline）显示**，而不是弹出下载对话框。
2.  **流式写入**: 使用 `FileInputStream` 和 `BufferedInputStream` 读取文件内容，并通过 `response.getOutputStream()` 直接作为二进制数据写入客户端。

### 3. 错误处理 (`outputError`)

* 当发生文件未找到、大小超限、不可预览等错误时，会调用 `outputError` 方法。
* 它会重置响应，并以 `text/html` 的形式，用 **HTML 格式**向客户端显示错误消息。此消息包含从 **I18nManager** 获取的国际化错误信息。

### 4. 与服务器端 JS 的协作

`previewServlet` 与服务器端 JavaScript (`efw.server.js:fire`) 协同工作。

1.  **JS 端**: 如果事件处理结果 (`Result`) 包含 **`actions.preview`**，`efw.server.js` 会获取文件路径信息并**保存到 Session 中**。
2.  **客户端**: `efw.client.js` 接收来自服务器的 `Result`，并向预览 URL（`/previewServlet`）发送请求。
3.  **Java 端**: `previewServlet` 利用 Session 中保存的信息提供文件。

这是一种通过 Session 提供文件而非直接在 URL 参数中公开文件路径，从而**确保安全**的常见设计模式。