# efw Chart 图表组件示例

## 概述

efw 框架提供了强大的图表功能，通过简单的 JSP 标签即可实现多种类型的图表展示。该组件支持 Google Charts 和 Chart.js 两种渲染引擎，能够满足在线和离线环境下的图表需求。

## 核心文件

- `helloChart.jsp`

## 功能特性

### 1. 数据表格配置
图表数据通过 HTML 表格定义，支持丰富的配置选项：
```html
<table id="chart1_data" 
       data-format="$#,##0" 
       data-legend="bottom" 
       data-ticks="0,200,400,600,800,1000">
    <!-- 表格内容 -->
</table>
```

- `data-format`: 数据格式设置（货币格式等）
- `data-legend`: 图例位置配置
- `data-ticks`: 坐标轴刻度设置
- `data-color`: 行列颜色配置

### 2. 图表渲染引擎
支持两种渲染模式：
```html
<!-- Google Charts 模式 (需要网络连接) -->
<efw:Chart mode="googlechart" />

<!-- Chart.js 模式 (支持离线使用) -->
<efw:Chart mode="chartjs" />
```

### 3. 支持的图表类型
通过 JavaScript API 动态切换多种图表类型：

| 图表类型 | 描述 | 支持引擎 |
|---------|------|---------|
| area | 区域图 | 两者 |
| bar | 条形图 | 两者 |
| column | 柱状图 | 两者 |
| donut | 环形图 | 两者 |
| line | 折线图 | 两者 |
| pie | 饼图 | 两者 |
| scatter | 散点图 | 两者 |
| stackedarea | 堆叠区域图 | 两者 |
| stackedbar | 堆叠条形图 | 两者 |
| stackedcolumn | 堆叠柱状图 | 两者 |
| radar | 雷达图 | Chart.js |

### 4. 配置选项回调
通过 setoptions 属性获取或设置图表配置信息：
```javascript
function setChar1Options(options) {
    $("#char1Options").html(JSON.stringify(options));
}
```

## 使用说明

### 1. 基础配置
```html
<efw:Chart 
    id="chart1"                <!-- 图表ID -->
    data="chart1_data"         <!-- 数据表格ID -->
    type="column"              <!-- 初始图表类型 -->
    mode="googlechart"         <!-- 渲染引擎 -->
    width="400px"             <!-- 图表宽度 -->
    height="300px"            <!-- 图表高度 -->
    setoptions="callbackFunc" <!-- 配置回调函数 -->
/>
```

### 2. 数据表格规范
数据表格需要遵循特定结构：
- 第一行为表头，定义数据系列名称
- 第一列为行标签
- 支持通过 data-color 属性设置颜色
- 支持数值格式化

### 3. 动态操作
通过 JavaScript API 动态操作图表：
```javascript
// 改变图表类型
chart1.setType('pie');

// 刷新图表数据
chart1.draw();
```

## 技术优势

### 1. 简化开发
- 无需编写复杂的 JavaScript 代码
- 通过 HTML 表格直接定义图表数据
- 类似 Excel 的配置方式，降低学习成本

### 2. 双引擎支持
- Google Charts: 功能丰富，图表美观
- Chart.js: 支持离线使用，轻量级

### 3. 主题定制
- 支持自定义颜色方案
- 可扩展的样式配置

## 注意事项

1. **网络依赖**: Google Charts 模式需要网络连接访问 Google 服务器
2. **浏览器兼容**: 建议使用现代浏览器获取最佳体验
3. **数据量限制**: 超大数量数据时建议使用服务器端分页

## 总结

efw 图表组件提供了简单易用的图表解决方案，通过声明式的配置方式大幅降低了图表开发的复杂度。无论是简单的数据可视化还是复杂的业务报表，都能通过简单的标签配置快速实现。

双引擎架构既保证了功能的丰富性，又提供了离线使用的灵活性，适合各种不同的应用场景需求。
