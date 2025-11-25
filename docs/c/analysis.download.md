所提供的 **`downloadServlet.java`** 是 Efw 框架中的一个专用 Servlet，负责**使客户端能够从服务器下载文件**。

此 Servlet 不仅提供单个文件的下载，还提供多功能下载处理，包括将多个文件打包成 ZIP 压缩文件，并可以设置密码保护。与 `previewServlet` 类似，其处理协作是通过服务器端 JavaScript (`efw.server.js`) 和 Session 完成的。

-----

## 📦 对 `downloadServlet.java` 的分析：文件下载处理

### 1\. 作用和机制

  * **作用**: 从 Session 中获取客户端事件处理指定的**文件路径和下载选项**（如 ZIP 压缩、保存名称、删除标志等），设置适当的 HTTP 响应头，然后将文件发送给客户端。
  * **Session 协作**: 与 `previewServlet` 类似，下载目标信息是通过 Session 属性（如 `EFW_DOWNLOAD_FILE` 和 `EFW_DOWNLOAD_ZIP` 等）传递，而不是通过 URL 参数。
  * **通知**: 在下载开始时设置 `efw_Downloaded=OK` 这个 Cookie，客户端 JavaScript（通常在 `efw.client.js` 中使用）可以借此识别**非异步通信**的下载过程已完成。

-----

### 2\. 处理流程 (`doGet`)

#### A. 获取下载选项并清除 Session

1.  **从 Session 获取**: 从 Session 中获取下载所需的所有选项（文件路径、ZIP 列表、保存名称、密码、下载后删除标志等）。
2.  **立即删除**: 获取后，为确保安全，**立即删除所有相关的 Session 属性**。

#### B. ZIP 压缩处理 (有条件)

```java
if(attr_zip!=null&&!"".equals(attr_zip)){
    // ... 创建临时 ZIP 文件
    // ... 调用 FileManager.zip() 生成 ZIP 文件
    // ... 将 attr_file 设置为临时 ZIP 文件名
}
```

  * 如果 `EFW_DOWNLOAD_ZIP` 属性包含文件列表，则在下载前执行 ZIP 压缩。
  * **创建临时文件**: 使用 `File.createTempFile("efw", "zip", ...)` 生成临时的 ZIP 文件。
  * **执行压缩**: 调用 `FileManager.zip`，使用文件列表 (`tmp_files`)、基础路径 (`attr_zipBasePath`) 和**密码** (`attr_password`) 执行压缩。

#### C. 设置响应头

1.  **设置默认文件名**:
      * ZIP 文件默认为 `"attachment.zip"`。
      * 单个文件则从文件路径中获取文件名，并设置为下载文件名（`attr_saveas`）。
2.  **MIME 类型**: 设置 **`response.setContentType("application/octet-stream")`**。这是最常见的 MIME 类型，用于强制浏览器打开**下载对话框**，无论文件类型如何（与 `previewServlet` 的内嵌显示形成对比）。
3.  **Content-Disposition**:
      * 设置 `Content-Disposition: attachment; filename="..."` 响应头。
      * 文件名（`attr_saveas`）使用 **`java.net.URLEncoder.encode`** 进行编码，以支持日文等多字节字符。
4.  **设置 Cookie**: 添加 `efw_Downloaded=OK` 这个 Cookie。

#### D. 读取和发送文件

  * 使用 `FileInputStream` 读取下载目标文件（单个文件或生成的临时 ZIP 文件）的内容。
  * 通过 `response.getOutputStream()` 将二进制数据流式传输给客户端。

#### E. 下载后的清理

下载完成后，根据选项删除资源。

  * **删除临时 ZIP 文件 (finally 块)**: 无论处理成功与否，生成的临时 ZIP 文件 (`tmp_zip`) 都**必然会被删除**。
  * **删除源文件 (deleteafterdownload)**: 如果从 Session 中获取到 `attr_deleteafterdownload="true"`，则下载完成的**源文件本身**（ZIP 压缩前的原始文件或单个文件）将通过 `FileManager.remove` 删除。

-----

### 3\. `previewServlet` 与 `downloadServlet` 的比较

| 项目 | previewServlet.java | downloadServlet.java |
| :--- | :--- | :--- |
| **URL** | `/previewServlet` | `/downloadServlet` |
| **目的** | 在浏览器内**内嵌显示**文件内容。 | 强制客户端将文件**保存**到本地。 |
| **MIME 类型** | 设置文件固有的 MIME 类型。 | 设置 `application/octet-stream`（强制下载）。 |
| **安全性** | 文件大小限制 (10MB)。 | 提供带密码的 ZIP 压缩选项。 |
| **资源管理**| 没有特定的临时文件删除功能。 | 具有**下载后删除源文件** (`deleteafterdownload`) 功能和临时 ZIP 文件的确保删除。 |

两个 Servlet 都采用了从 `efw.server.js` 通过 Session 接收文件路径的共同机制，但它们在响应头设置和资源管理方面的逻辑完全不同，以适应各自的目的。