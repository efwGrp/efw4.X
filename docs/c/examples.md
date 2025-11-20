# EFW 示例

包含文档链接的示例实现和测试集合


## 示例

### [efw 框架输入测试示例](example1.md)
本示例演示了如何使用 efw 框架处理各种类型的 HTML 输入元素。

- JSP 页面 ([InputTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/InputTest.jsp))
- JavaScript 事件处理 ([InputTest_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/InputTest_submit.js))

-----

### [efw 框架输出测试示例](example2.md)
本示例演示了如何使用 efw 框架将 JSON 数据动态填充到各种 HTML 表单元素中。

- JSP 页面 ([OutputTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/OutputTest.jsp))
- JavaScript 事件处理 ([OutputTest_display.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/OutputTest_display.js))

-----

### [efw 框架动作测试示例](example3.md)
本示例演示了如何使用 efw 框架实现各种前端操作功能，包括快捷键、元素控制、对话框、文件操作和页面导航等。

- JSP 页面 ([ActionTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/ActionTest.jsp))
- JavaScript 事件处理 ([ActionTest_run.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/ActionTest_run.js))

-----

### [efw 对话框示例](example4.md)

本示例展示了 efw 框架中对话框功能的完整实现，包括多种对话框类型（警告、确认、等待、预览和自定义对话框）的使用方法。

#### JQuery UI 版
- JSP 页面 ([helloDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog.jsp))
- 自定义对话框组件 ([helloDialog_myDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog.jsp))
- 对话框初始化事件处理 ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

#### Bootstrap4 版
- JSP 页面 ([helloDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog4.jsp))
- 自定义对话框组件 ([helloDialog_myDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog4.jsp))
- 对话框初始化事件处理 ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

#### Bootstrap5 版
- JSP 页面 ([helloDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog5.jsp))
- 自定义对话框组件 ([helloDialog_myDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog5.jsp))
- 对话框初始化事件处理 ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

-----

### [efw 文件上传示例](example5.md)

本示例展示了 efw 框架中文件上传功能的实现。efw 框架提供了简洁的 API 来处理文件上传、保存和管理操作，同时支持文件类型验证。

- JSP 页面 ([helloUpload.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloUpload.jsp))
- 单文件上传处理 ([helloUpload_submit1.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloUpload_submit1.js))
- 多文件上传处理 ([helloUpload_submitM.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloUpload_submitM.js))

-----

### [efw elFinder 文件管理器示例](example6.md)

efw 框架集成了 elFinder 文件管理器，通过简单的标签即可在 Web 应用中实现完整的文件管理功能。

- 基础用法示例 ([helloElfinder.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloElfinder.jsp))
- 安全配置测试示例 ([helloElfinder4.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloElfinder4.jsp))

-----

### [efw Chart 图表组件示例](example7.md)

efw 框架提供了强大的图表功能，通过简单的 JSP 标签即可实现多种类型的图表展示。

- JSP 页面 ([helloChart.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloChart.jsp))

-----

### [efw 条码与二维码生成示例](example8.md)

efw 框架提供了强大的条码和二维码生成功能，通过简单的 Servlet 调用即可生成多种类型的条形码和二维码。

- JSP 页面 ([helloBarcode.jsp.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloBarcode.jsp))

-----

### [efw Excel 操作示例](example9.md)

efw 框架提供了一套简化 Excel 操作的 API，通过封装 Apache POI 的复杂操作，使 Excel 文件的创建、编辑和处理变得更加简单直观。

- JSP 页面 ([helloExcel.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloExcel.jsp))
- Excel 操作处理 ([helloExcel_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloExcel_submit.js))

-----

### [efw 大文件处理技术示例](example10.md)

本示例展示了 efw 框架处理大型文本和 CSV 文件的多种优化方案，特别针对大数据量场景下的内存管理、I/O 效率和并发处理提供了完整的解决方案。

- JSP 页面 ([helloTextCSV.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloTextCSV.jsp))
- 固定长度文本处理 ([helloTextCSV_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloTextCSV_submit.js))
- CSV格式处理 ([helloTextCSV_submit2.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloTextCSV_submit2.js))

-----

### [](exampleX.md)


- XXX ([XXX.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/))
- XXXX ([XXXX.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/))

-----

### [](exampleX.md)


- XXX ([XXX.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/))
- XXXX ([XXXX.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/))

-----

### [](exampleX.md)


- XXX ([XXX.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/))
- XXXX ([XXXX.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/))

-----

