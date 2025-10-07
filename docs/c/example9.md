# efw Excel 操作示例

## 概述

efw 框架提供了一套简化 Excel 操作的 API，通过封装 Apache POI 的复杂操作，使 Excel 文件的创建、编辑和处理变得更加简单直观。本示例展示了 efw 框架中 Excel 操作的各种功能。

## 核心文件

1. **主页面**: `helloExcel.jsp`
2. **Excel 操作处理**: `helloExcel_submit.js`

## 功能特性

### 1. 模板驱动的操作
efw Excel API 采用模板驱动的方式，可以基于现有模板快速创建工作表和单元格，保持样式和格式的一致性。

```javascript
// 基于模板创建工作表
.createSheet("newSheet", "templateSheet")

// 基于模板设置单元格样式
.setCell("sheetName", "A1", "value", "templateSheet", "B2")
```

### 2. 丰富的工作表操作
- 创建工作表（支持模板复制）
- 调整工作表顺序
- 显示/隐藏工作表
- 删除工作表
- 设置活动工作表
- 设置打印区域

### 3. 灵活的行列管理
- 添加/删除行
- 显示/隐藏行列
- 动态调整行列布局

### 4. 数据操作功能
- 设置单元格值和样式
- 创建超链接
- 支持各种数据类型（文本、数字、日期）
- 批量数据读取（支持格式化和回调）

### 5. 图形处理能力
- 添加各种形状（圆形、矩形等）
- 图形位置精确定位
- 图片替换功能
- 图形状态检查

### 6. 公式支持
- 自动应用公式
- 保持公式计算功能

## 使用说明

### 1. 基本工作流程
```javascript
// 1. 创建或打开Excel文件
var excel = new Excel("template.xlsx");

// 2. 执行各种操作
excel.createSheet("newSheet", "templateSheet")
    .setCell("newSheet", "A1", "Hello World")
    .addRow("newSheet", 0);

// 3. 保存文件
excel.save("output.xlsx");

// 4. 关闭文件
excel.close();
```

### 2. 数据读取示例
```javascript
// 读取数组数据
var data = excel.getArray("Sheet1", 1, 1, {
    name: "A",
    age: "B",
    salary: ["C", "#,##0.00"],
    date: ["D", "yyyy/MM/dd"]
});

// 读取单个单元格
var value = excel.getValue("Sheet1", "A1");
```

### 3. 图形操作示例
```javascript
// 添加图形, myCircle是模版上已经准备好的图形的名字
excel.addShape("Sheet1", "B2", "TemplateSheet", "myCircle", "Circle Text");

// 检查是否被图形覆盖
var tf = excel.isEncircled("Sheet1", "A1", 0.5, 0.5);
```

## 技术优势

### 1. 简化复杂操作
efw Excel API 封装了 Apache POI 的复杂操作，使 Excel 文件处理变得更加简单直观。

### 2. 模板复用
支持基于模板的操作，确保样式和格式的一致性，提高开发效率。

### 3. 链式调用
支持链式调用，代码更加简洁易读。

### 4. 类型安全
提供完整的类型支持，减少运行时错误。

## 总结

efw 框架的 Excel 操作 API 提供了一个简单而强大的解决方案，极大地简化了 Excel 文件的创建、编辑和处理工作。通过模板驱动的设计和丰富的功能集，开发者可以快速实现复杂的 Excel 操作需求，而无需深入了解 Apache POI 的复杂细节。

该 API 支持各种操作类型，包括工作表管理、行列操作、数据处理、图形操作和公式计算，能够满足大多数 Excel 处理场景的需求。链式调用的设计使代码更加简洁易读，提高了开发效率和代码质量。
