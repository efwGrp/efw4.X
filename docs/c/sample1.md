# efw 框架输入测试示例

## 概述

本示例演示了如何使用 efw (Escco-Framework) 框架处理各种类型的 HTML 输入元素。efw 是一个基于服务器端 JavaScript 的 Ajax 框架，采用目的导向的设计方法。

## 核心文件

### 1. JSP 页面 (InputTest.jsp)

### 2. JavaScript 事件处理 (InputTest_submit.js)

## 功能特点

1. **全面的输入类型支持**：支持所有 HTML5 输入类型(text, search, tel, url, email, password 等)
2. **特殊元素处理**：
   - 复选框(checkbox)：返回选中时的值或 null
   - 单选按钮(radio)：使用 `[name=item19]:checked` 选择器
   - 多选列表：返回数组格式数据
3. **数据格式化**：通过 `data-format` 属性实现自动格式化
   - 数字格式：`#,##0.00`
   - 日期时间格式：`yyyy/MM/dd HH:mm:ss`
4. **响应式更新**：使用 Ajax 异步更新页面内容

## 技术亮点

- **声明式参数映射**：通过 `paramsFormat` 对象定义前端元素与后端参数的映射关系
- **自动数据类型转换**：格式化字段自动转换为数字或日期类型
- **JSON 数据交互**：前后端通过 JSON 格式交换数据
- **jQuery 选择器支持**：使用灵活的选择器定位页面元素

此示例展示了 efw 框架如何简化 Ajax 开发流程，通过少量代码实现复杂的表单数据处理功能。
