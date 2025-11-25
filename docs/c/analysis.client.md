# 💻 客户端 JavaScript 库：EFW

所提供的源代码构成了名为 **EFW** 的框架的**客户端 JavaScript 库**（`efw.js` 和 `efw.client.js`）。

该框架的主要目的是提供**客户端（浏览器）与服务器之间的事件驱动通信**以及随之而来的**UI 操作自动化**。

---

## 🧪 主要结构和功能

### 1\. `Efw` 构造函数（`efw.js`）

* **基本用法：** 以 `Efw("eventId")` 的形式使用，用于向服务器发起特定的**事件**。
* **重载（Overloading）：** `Efw` 根据参数的数量和类型支持多种参数模式。
    * `eventId` (必需): 要执行的服务器事件的 ID。
    * `manualParams`: 手动传递给事件的参数（对象）。
    * `server`: 通信目标服务器的 URL（字符串）。
    * `wsMode`: 是否使用 WebSocket 模式（布尔值）。
* **事件参数的构建：** 它根据传入的参数构建一个 `eventParams` 对象。
    ```javascript
    // 示例: 只传入 eventId 和 wsMode
    Efw("myEvent", true); // manualParams 被解析为布尔值，wsMode=true
    // 示例: 传入 eventId 和 manualParams
    Efw("myEvent", { key: "value" });
    ```
* **事件的执行：** 最终执行 `(new EfwClient()).fire(eventParams)`，通过 `EfwClient` 实例开始事件处理。

### 2\. 全局实例和属性（`efw.js`）

* **`efw` 实例：** 作为 `var efw = new Efw();` 生成的全局实例，用于访问框架的基本功能。
* **原型属性：**
    * `efw.baseurl`: 基础 URL（默认为 `.`）。
    * `efw.lang`: 语言设置（默认为 `"en"`）。
    * `efw.dialog`: 用于对话框控制的 `EfwDialog` 实例。
    * `efw.messages`: 用于消息控制的 `EfwClientMessages` 实例。
    * `efw.isDownloading`: 下载中标志。

### 3\. 系统初始化（`efw.js`）

* **DOM Ready 时的处理：** 在 `$(function() { ... });` 中，DOM 准备就绪后执行以下处理（使用 jQuery）：
    * **输入行为控制：** 将 `efwClientInputBehavior` 的方法绑定到 `keydown`、特定输入元素的 `focus` 和 `blur` 事件，以定制输入操作的行为（例如：快捷键、格式化处理）。
    * **加载显示：** 设置在 `ajaxStart` 时显示 `#efw_loading`，在 `ajaxStop` 时隐藏它，以提供 Ajax 通信期间的**加载动画**。
    * **对话框和消息的初始化：** 初始化 `efw.dialog` 和 `efw.messages`。

---

## 📡 `EfwClient` 的通信流程（`efw.client.js`）

`EfwClient.prototype.fire` 方法包含执行服务器事件的核心逻辑。

### 1\. 事件执行流程

事件执行基本上由以下**两个阶段的 Ajax 通信**（或 WebSocket 通信）组成。

| 步骤 | 方法 | 目的 |
| :--- | :--- | :--- |
| **清除** | N/A | 清除错误显示 (`.efw_input_error`)。 |
| **URL 构建** | N/A | 构建 `efwServlet`、`uploadServlet`、`downloadServlet`、`previewServlet` 和 `efwWebSocket` 的 URL。 |
| **阶段 1** | `_callFirstAjax` | 向服务器发送事件 ID，以获取客户端应**收集的参数格式** (`paramsFormat`)。 |
| **参数收集** | `_pickupParams` | 根据从服务器获取的 `paramsFormat`，自动从 HTML 元素 (`$(key)`) 和 `manualParams` 中收集数据。 |
| **文件上传** | `_callUploadAjax` | 如果包含文件输入 (`<input type="file">`)，则使用 `FormData` **上传文件**。 |
| **阶段 2** | `_callSecondAjax` / `_callSecondAjaxInWsMode` | 将**收集到的全部参数**发送到服务器，以获取**事件的执行结果** (`values`, `actions`)。 |
| **结果反映** | `_showValues` | 根据服务器返回的 `values`，**自动更新 HTML 元素的值**。 |
| **动作执行** | `_showActions` | 根据服务器返回的 `actions`，执行**客户端操作**（错误显示、元素的显示/隐藏、导航、下载等）。 |

### 2\. 参数的收集 (`_pickupParams`)

* **目的：** 使用 `paramsFormat` 中定义的选择器 (`key`)，自动从 DOM 元素中获取值，并存储在 `data` 对象中。
* **数据类型处理：**
    * 如果 `format` 是 `null` 或字符串：获取 HTML 元素的值（`.val()`, `.text()`, `src`, `html()`)。
    * 如果 `format` 包含 `secure:true`：将值通过 `btoa(encodeURIComponent(vl))` **编码（简单加密）** 后发送。
    * 如果 `format` 是数组 (`[]`) 或对象 (`{}`)：递归调用 `_pickupParams`，获取结构化数据（支持表格和复合对象的获取）。
* **文件上传的特殊处理：** 对于 `<input type="file">`，文件本身被添加到 `_pickupParams_uploadformdata` (`FormData`) 中，而参数值则存储文件名的 `|` 分隔列表。

### 3\. 动作的处理 (`_showActions`)

服务器通过返回 `actions` 对象来指示客户端执行特定动作。

* **错误处理：** 如果存在 `actions.error`，则从 `efw.messages` 获取消息，并通过 `efw.dialog.alert` 显示。
* **UI 操作：** 更改 `actions.show`、`actions.hide`、`actions.enable`、`actions.disable`、`actions.highlight` 中指定的选择器对应元素的状态。
* **特殊动作：**
    * `actions.preview`: 显示预览对话框。
    * `actions.progress`: 显示进度对话框。
    * `actions.download`: 通过 `window.location = downloadUrl` 开始下载，并等待表示下载完成的 Cookie (`efw_Downloaded`) 后再进行下一步处理。
* **最终动作：** 在通过 `actions.confirm` 或 `actions.alert` 显示对话框后，执行 `actions.eval`（执行 JavaScript 代码）、`actions.focus` 或 `actions.navigate`（屏幕跳转）。

## 💡 总结

所提供的源代码被设计为一个**健壮的客户端框架**，用于**抽象化和自动化“客户端-服务器之间的双向通信”和“UI 的数据绑定/操作”**。开发人员无需编写冗余的 Ajax 回调处理或 DOM 操作代码，只需调用 `Efw("eventId")` 即可完成服务器事件的执行、参数的自动收集、结果的自动显示以及 UI 动作的执行。
