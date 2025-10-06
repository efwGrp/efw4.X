# efw 文件上传示例

## 概述

本示例展示了 efw 框架中文件上传功能的实现，特别演示了如何限制上传文件类型（仅允许.xlsx格式）。efw 框架提供了简洁的 API 来处理文件上传、保存和管理操作，同时支持文件类型验证。

## 核心文件

1. **主页面**: `helloUpload.jsp`
2. **单文件上传处理**: `helloUpload_submit1.js`
3. **多文件上传处理**: `helloUpload_submitM.js`

## 功能实现

### 1. 文件类型限制

#### 前端限制

```html
<input type="file" id="file1" accept=".xlsx">
```

- 使用 `accept=".xlsx"` 属性限制只能选择 Excel 文件
- 浏览器会自动过滤非.xlsx文件

#### 后端验证

```javascript
helloUpload_submit1.paramsFormat = {
    "#file1": "accept:xlsx;display-name:单文件选择框"
};
```

- 在 `paramsFormat` 中添加 `accept:xlsx` 验证规则
- 如果上传非.xlsx文件，框架会自动阻止并显示错误消息
- `display-name` 属性用于在错误消息中显示友好的字段名称

### 2. 单文件上传流程

1. **用户选择文件**：
   - 通过 `<input type="file" id="file1" accept=".xlsx">` 选择单个.xlsx文件

2. **触发上传事件**：
   - 点击"执行"按钮调用 `Efw('helloUpload_submit1')`

3. **服务器端处理**：

```javascript
   // 清理并创建上传目录
   file.remove("upload");
   file.makeDir("upload");
   
   // 解析文件名
   var filePath = params["#file1"];
   var filename = filePath.split(/[\\\/]/g).pop();
   
   // 保存上传的文件
   file.saveSingleUploadFile("upload/" + filename);
```

4. **返回结果**：
   - 获取上传目录文件列表
   - 在 `#divResult` 中显示结果

### 3. 多文件上传流程

1. **用户选择多个文件**：
   - 通过 `<input type="file" id="fileM" multiple accept=".xlsx">` 选择多个.xlsx文件

2. **触发上传事件**：
   - 点击"执行"按钮调用 `Efw('helloUpload_submitM')`

3. **服务器端处理**：

```javascript
   // 清理并创建上传目录
   file.remove("upload");
   file.makeDir("upload");
   
   // 保存所有上传的文件
   file.saveUploadFiles("upload");
```

4. **返回结果**：
   - 获取上传目录文件列表
   - 在 `#divResult` 中显示结果

## 技术亮点

### 1. 文件类型验证

#### 前端验证
- 使用 HTML5 `accept` 属性限制可选文件类型
- 浏览器原生支持，提供一致的用户体验

#### 后端验证
- 在 `paramsFormat` 中定义 `accept:xlsx` 规则
- 框架自动验证文件类型
- 提供友好的错误消息（使用 `display-name`）

### 2. 文件操作 API

#### 目录管理
- `file.remove("upload")`: 删除目录及其内容
- `file.makeDir("upload")`: 创建新目录

#### 文件保存
- `file.saveSingleUploadFile("upload/filename")`: 保存单个上传文件
- `file.saveUploadFiles("upload")`: 保存多个上传文件

#### 文件列表
- `file.list("upload")`: 获取目录中的文件列表

### 3. 参数处理
- 使用 `paramsFormat` 定义前端元素与后端参数的映射关系
- 支持验证规则定义（accept, required, format 等）
- 通过 `params["#file1"]` 获取文件路径

### 4. 结果返回
- 使用 `Result` 对象返回处理结果
- 通过 `withdata()` 方法更新页面内容
- 使用 `JSON.stringify()` 格式化输出

## 使用说明

### 1. 单文件上传
1. 点击"选择文件"按钮选择单个.xlsx文件
2. 点击"执行"按钮上传文件
3. 上传结果将显示在页面底部

### 2. 多文件上传
1. 点击"选择文件"按钮选择多个.xlsx文件（按住 Ctrl 或 Shift 选择多个）
2. 点击"执行"按钮上传所有文件
3. 上传结果将显示在页面底部

### 3. 文件存储
- 文件存储在服务器端的 `upload` 目录下
- 每次上传前会清空目录内容
- 上传后显示目录中的文件列表

## 安全注意事项

### 1. 文件类型验证
- 前端和后端双重验证确保只接受.xlsx文件
- 防止上传可执行文件等危险文件类型

### 2. 文件大小限制
- 应设置最大文件大小限制
- 防止上传过大文件导致服务器资源耗尽
- 这项功能请通过tomcat设置实现

### 3. 文件名处理
- 框架会检查文件名防止路径遍历攻击

### 4. 访问控制
- 上传目录不应有执行权限
- 上传文件不应直接通过 URL 访问

> 此示例展示了 efw 框架如何实现安全的文件上传功能，通过前后端双重验证确保只接受特定类型的文件，同时提供了完整的文件管理功能。