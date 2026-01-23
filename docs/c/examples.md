# EFW 示例

包含文档链接的示例实现和测试集合


## 示例

### [efw 框架输入测试示例](example1.md)
本示例演示了如何使用 efw 框架处理各种类型的 HTML 输入元素。

- JSP 页面 ([InputTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/InputTest.jsp))
- JavaScript 事件处理 ([InputTest_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/InputTest_submit.js))

-----

### [efw 框架输出测试示例](example2.md)
输出测试示例 是 efw 框架中展示数据输出功能的完整示例，演示了如何将 JSON 数据动态填充到各种 HTML 表单元素中。本示例包含前端 JSP 页面和后端 JavaScript 事件处理逻辑。

- JSP 页面 ([OutputTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/OutputTest.jsp))
- JavaScript 事件处理 ([OutputTest_display.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/OutputTest_display.js))

-----

### [efw 框架动作测试示例](example3.md)
ActionTest 是 efw 框架中展示用户界面交互和操作的完整示例，演示了如何实现各种前端操作功能，包括快捷键、元素控制、对话框、文件操作和页面导航等。

- JSP 页面 ([ActionTest.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/ActionTest.jsp))
- JavaScript 事件处理 ([ActionTest_run.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/ActionTest_run.js))

-----

### [efw 对话框示例](example4.md)

本示例展示了 efw 框架中对话框功能的完整实现，包括多种对话框类型（警告、确认、等待、预览和自定义对话框）的使用方法。efw 框架提供了简洁的 API 来创建和管理各种用户交互对话框。

#### JQuery UI 版
- JSP 页面 ([helloDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog.jsp))
- 自定义对话框组件 ([helloDialog_myDialog.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog.jsp))
- 对话框初始化事件处理 ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

#### Bootstrap4 版
- JSP 页面 ([helloDialog4.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog4.jsp))
- 自定义对话框组件 ([helloDialog_myDialog4.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog4.jsp))
- 对话框初始化事件处理 ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

#### Bootstrap5 版
- JSP 页面 ([helloDialog5.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog5.jsp))
- 自定义对话框组件 ([helloDialog_myDialog5.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDialog_myDialog5.jsp))
- 对话框初始化事件处理 ([helloDialog_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDialog_init.js))

-----

### [efw 文件上传示例](example5.md)

本示例展示了 efw 框架中文件上传功能的实现，特别演示了如何限制上传文件类型（仅允许.xlsx格式）。efw 框架提供了简洁的 API 来处理文件上传、保存和管理操作，同时支持文件类型验证。

- JSP 页面 ([helloUpload.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloUpload.jsp))
- 单文件上传处理 ([helloUpload_submit1.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloUpload_submit1.js))
- 多文件上传处理 ([helloUpload_submitM.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloUpload_submitM.js))

-----

### [efw elFinder 文件管理器示例](example6.md)

efw 框架集成了 elFinder 文件管理器，通过简单的标签即可在 Web 应用中实现完整的文件管理功能。elFinder 是一个基于 JavaScript 和 PHP 的流行文件管理器，efw 框架对其进行了封装，提供了 Java 连接器并以 JSP 标签形式提供。

- 基础用法示例 ([helloElfinder.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloElfinder.jsp))
- 安全配置测试示例 ([helloElfinder4.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloElfinder4.jsp))

-----

### [efw Chart 图表组件示例](example7.md)

efw 框架提供了强大的图表功能，通过简单的 JSP 标签即可实现多种类型的图表展示。该组件支持 Google Charts 和 Chart.js 两种渲染引擎，能够满足在线和离线环境下的图表需求。

- JSP 页面 ([helloChart.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloChart.jsp))

-----

### [efw 条码与二维码生成示例](example8.md)

efw 框架提供了强大的条码和二维码生成功能，通过简单的 Servlet 调用即可生成多种类型的条形码和二维码。该功能基于 ZXing 和 Barcode4j 库实现，支持包括 QR Code、Code 128、EAN-13 等在内的多种条码格式。

- JSP 页面 ([helloBarcode.jsp.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloBarcode.jsp))

-----

### [efw Excel 操作示例](example9.md)

efw 框架提供了一套简化 Excel 操作的 API，通过封装 Apache POI 的复杂操作，使 Excel 文件的创建、编辑和处理变得更加简单直观。本示例展示了 efw 框架中 Excel 操作的各种功能。

- JSP 页面 ([helloExcel.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloExcel.jsp))
- Excel 操作处理 ([helloExcel_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloExcel_submit.js))

-----

### [efw 大文件处理技术示例](example10.md)

本示例展示了 efw 框架处理大型文本和 CSV 文件的多种优化方案，特别针对大数据量场景下的内存管理、I/O 效率和并发处理提供了完整的解决方案。

- JSP 页面 ([helloTextCSV.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloTextCSV.jsp))
- 固定长度文本处理 ([helloTextCSV_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloTextCSV_submit.js))
- CSV格式处理 ([helloTextCSV_submit2.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloTextCSV_submit2.js))

-----

### [efw 数据库操作示例](example11.md)

efw 框架提供了一套完整的数据库操作解决方案，支持连接池管理、外部 SQL 定义和数据转换处理。本示例展示了如何使用 efw 进行各种数据库操作，包括表创建、数据插入、更新、删除等基本 CRUD 操作。

- JSP 页面 ([helloDB.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloDB.jsp))
- 默认连接池操作 ([helloDB_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDB_submit.js))
- 备用连接池操作 ([helloDB_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloDB_submit2.js))
- SQL 定义文件 ([helloDB.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/sql/helloDB.xml))

-----

### [efw 邮件发送功能示例](example12.md)

efw 框架提供了简单易用的邮件发送功能，支持通过 Gmail SMTP 服务器发送邮件。该功能支持模板化邮件内容、附件发送、多收件人设置等高级特性，同时保持了使用的简洁性。

- JSP 页面 ([helloMail.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloMail.jsp))
- 邮件发送处理 ([helloMail_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloMail_submit.js))
- 邮件模板配置 ([mails.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/mail/mails.xml))

-----

### [efw 多语言支持示例](example13.md)

efw 框架提供了完整的国际化（i18n）支持，使应用程序能够轻松实现多语言功能。通过外部化的语言资源文件和简单的标签使用，可以快速构建支持多种语言的 Web 应用程序。

- JSP 页面 ([helloI18n.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloI18n.jsp))
- 多语言消息处理 ([helloI18n_submit.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloI18n_submit.js))
- 英语语言资源文件 ([en.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/i18n/en.xml))
- 日语语言资源文件 ([jp.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/i18n/jp.xml))
- 中文语言资源文件 ([cn.xml](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/i18n/cn.xml))

-----

### [efw PDF 处理功能示例](example15.md)

efw 框架提供了强大的 PDF 处理功能，支持两种主要的 PDF 操作方式：PDF 表单字段填充（字段填充功能）和 HTML 到 PDF 的转换（HTML转换功能）。本示例展示了如何使用 efw 的 PDF 模块进行高效的 PDF 文档生成和处理。

- JSP 页面 ([helloPdf.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloPdf.jsp))
- PDF 表单字段填充处理 ([helloPdf_fillField.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloPdf_fillField.js))
- HTML 到 PDF 转换处理 ([helloPdf_html2pdf.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloPdf_html2pdf.js))

-----

### [efw 与 Vue.js 集成示例](example16.md)

本示例展示了如何将 efw 框架与 Vue.js 前端框架进行集成，实现前后端分离的开发模式。efw 负责后端数据处理和业务逻辑，Vue.js 负责前端的用户界面和状态管理，二者通过 efw事件 进行通信。

- JSP 页面 ([helloVue.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloVue.jsp))
- 数据初始化处理 ([helloVue_init.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloVue_init.js))
- 数据发送处理 ([helloVue_send.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloVue_send.js))

-----

### [efw WebSocket 模式功能示例](example17.md)

efw 框架提供 WebSocket 模式支持，实现了实时通信、进度反馈和广播功能。本示例展示如何使用 WebSocket 模式进行高效的客户端-服务器通信，包括进度显示和实时消息广播。

- JSP 页面 ([helloWsMode.jsp](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/helloWsMode.jsp))
- 进度测试功能 ([helloWsMode_progress_test.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_progress_test.js))
- 广播启动功能 ([helloWsMode_broadcast_start.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_start.js))
- 广播停止功能 ([helloWsMode_broadcast_stop.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_stop.js))
- 广播接收功能 ([helloWsMode_broadcast_receive.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_receive.js))
- 广播接收停止功能 ([helloWsMode_broadcast_bye.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloWsMode_broadcast_bye.js))

-----

### [efw框架登录与权限控制示例](example18.md)

这是一个基于efw框架的Web应用程序示例，演示了完整的登录控制和权限控制功能。该示例适用于企业内部或面向互联网的Web应用，提供了**纵深防御安全体系**，有效防止URL直接访问和开发者工具恶意调用。

- 工程目录 ([skeletonSample](https://github.com/efwGrp/efw4.X/tree/master/examples/skeletonSample/))

-----

### [efw 批处理示例介绍](example19.md)

EFW提供了一个强大的批处理功能，允许开发者通过 JavaScript 编写批处理逻辑，并在 Windows 和 Linux 环境下执行。以下是一个完整的批处理示例。

- Windows 批处理启动脚本 ([helloBatch.bat](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/efw/batch/helloBatch.bat))
- Linux 批处理启动脚本   ([helloBatch.sh](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/helloBatch.sh))
- 批处理业务逻辑 ([helloBatch.js](https://github.com/efwGrp/efw4.X/tree/master/examples/helloworld/WEB-INF/efw/event/))

