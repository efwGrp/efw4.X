# efw PDF 处理功能示例

## 概述

efw 框架提供了强大的 PDF 处理功能，支持两种主要的 PDF 操作方式：PDF 表单字段填充（字段填充功能）和 HTML 到 PDF 的转换（HTML转换功能）。本示例展示了如何使用 efw 的 PDF 模块进行高效的 PDF 文档生成和处理。

## 核心文件

1. **PDF 测试主页面**: `helloPdf.jsp`
2. **PDF 表单字段填充处理**: `helloPdf_fillField.js`
3. **HTML 到 PDF 转换处理**: `helloPdf_html2pdf.js`

## 功能特性

### 1. PDF 表单字段填充

#### 支持的表单字段类型
- **文本字段**: 单行文本输入
- **多行文本字段**: 支持换行的文本内容
- **复选框**: 支持选中/未选中状态
- **单选按钮组**: 支持选择一组中的某个选项
- **下拉列表**: 支持从预定义选项中选择
- **日期字段**: 支持日期格式输入

#### 使用方法
```javascript
// 创建 Pdf 实例
var pdf = new Pdf("template.pdf");

// 设置字段值
pdf.setField("field_name", "field_value");

// 保存结果
pdf.save("output.pdf");
```

### 2. HTML 到 PDF 转换

#### 支持的 HTML/CSS 特性
- **外部 CSS 文件**: 支持引入外部样式表
- **内联样式**: 支持 style 属性
- **CSS 选择器**: 支持类选择器、ID 选择器等
- **页面设置**: 支持页面大小、方向、边距等设置
- **绝对定位**: 支持 position: absolute
- **表格样式**: 支持完整的表格样式
- **图片**: 支持本地和网络图片

#### 使用方法
```javascript

// 获取可用字体列表
var fontList = Pdf.getFontNames("fonts");
console.log("可用字体: " + fontList.join(", "));

// 生成 PDF
Pdf.html2pdf(
    htmlContent,     // HTML 内容
    baseUrl,         // 基础 URL（用于解析相对路径）
    outputFileName,  // 输出文件名
    fontDirectory    // 字体目录
);
```

#### 高级页面设置
参考网站: https://developer.mozilla.org/ja/docs/Web/CSS/@page

```html
// 自定义页面设置
var html = `
<html>
<head>
    <style>
        @page {
            size: A4 portrait;
            margin: 2cm;
            @top-center {
                content: "页眉内容";
            }
            @bottom-right {
                content: "页码 " counter(page) " / " counter(pages);
            }
        }
        body {
            font-family: MS Gothic;
            font-size: 12pt;
        }
    </style>
</head>
<body>
    <h1>自定义页面设置</h1>
    <p>文档内容...</p>
</body>
</html>
`;
```