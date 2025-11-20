# efw 对话框示例

## 概述

本示例展示了 efw 框架中对话框功能的完整实现，包括多种对话框类型（警告、确认、等待、预览和自定义对话框）的使用方法。

## 核心文件

1. **主页面**: `helloDialog.jsp`
2. **自定义对话框组件**: `helloDialog_myDialog.jsp`
3. **对话框初始化事件处理**: `helloDialog_init.js`

## 功能实现

### 1. 对话框类型

#### 警告对话框 (Alert)

```js
efw.dialog.alert("I am here");
```

- 显示简单的警告消息
- 用户只能点击确定关闭

#### 确认对话框 (Confirm)

```js
efw.dialog.confirm(
    "测试警报。",
    {
        "是": function(){ alert("我按下了“是”。"); },
        "否": function(){ alert("我按了“否”。"); }
    },
    "警报测试",
    function(){ alert("测试完成"); }
);
```

- 显示带有自定义按钮的确认对话框
- 每个按钮有独立的回调函数
- 支持对话框标题
- 支持关闭后回调

#### 等待对话框 (Wait)

```js
efw.dialog.wait(
    "请等待5秒。",
    5,
    "等待测试",
    function(){ alert("测试完成"); }
);
```

- 显示等待消息
- 设置等待时间（秒）
- 支持对话框标题
- 支持超时后回调

#### 预览对话框 (Preview)

```js
efw.dialog.preview("a.jpg", "a.jpg");
```

- 预览文件内容
- 支持图片等文件类型预览

#### 自定义对话框 (Dialog)

```js
function testDialog(){
    myDialog.p1 = 'hello world! ' + new Date();
    myDialog.dialog('open');
}
```

- 完全自定义的对话框
- 支持参数传递
- 支持打开/关闭事件处理

### 2. 自定义对话框工作流程

1. **初始化对话框**：
   - 在 `helloDialog_myDialog.jsp` 中定义对话框结构和初始化逻辑
   - 使用 jQuery UI 的 dialog 组件创建对话框

2. **打开对话框**：
   - 在 `testDialog()` 函数中设置参数并打开对话框
   - 通过 `myDialog.p1` 传递参数

3. **初始化事件**：
   - 对话框打开时触发 open 事件
   - 调用 `Efw("helloDialog_init", { msg: myDialog.p1 })`
   - 将参数传递给初始化事件处理器

4. **处理初始化**：
   - `helloDialog_init.js` 接收参数
   - 使用 Result 对象更新对话框内容
   - 将消息显示在对话框的 `.msg` 元素中

## 技术亮点

### 1. 模块化设计
- 主页面、对话框组件和事件处理分离
- 使用 `<efw:part>` 引入组件

### 2. 参数传递机制
- 通过自定义属性（如 `myDialog.p1`）传递参数
- 事件处理器通过 `params` 接收参数

### 3. 链式操作 API

```js
return (new Result())
    .runat("#myDialog")
    .withdata({".msg": params["msg"]});
```

### 4. 事件驱动架构
- 对话框打开时触发初始化事件
- 使用 `Efw()` 函数调用服务器端事件

### 5. 调试支持

```js
params.debug(); // 输出参数信息
```

### 6. 灵活的对话框配置
- 高度可定制的对话框选项
- 支持模态/非模态对话框
- 可调整大小和位置

## 使用场景

此示例适用于：
- 需要用户确认的操作
- 文件预览功能
- 自定义复杂对话框
- 需要参数传递的对话框场景

> 通过此示例，开发者可以学习 efw 框架中各种对话框的使用方法，以及如何创建和管理自定义对话框。