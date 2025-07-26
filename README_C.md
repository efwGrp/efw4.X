[English](README.md), [日本語](README_J.md), [中文](README_C.md)

## 介绍

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Efw Flow](./help/img/efw_flow.png)](./help/img/efw_flow_org.png)<br>
[![Efw Client](./help/img/efw_client.png)](./help/img/efw_client_org.png)
[![Efw Server](./help/img/efw_server.png)](./help/img/efw_server_org.png)

* [Efw 是什么？](https://qiita.com/changkejun/private/844953846f3e6bed4a9d)
* [Efw 安全相关说明](https://qiita.com/changkejun/private/70184f814ff52f862d91)
* [构建高负载 Tomcat 环境](https://qiita.com/changkejun/private/fb325ed0a9d81f3bf5f0)


## 示例

* [测试每种类型的输入元素](https://qiita.com/changkejun/private/2f59403e8fa3b0f40eb7) ([helloworld/InputTest.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/InputTest.jsp))
* [测试每种类型的值显示](https://qiita.com/changkejun/private/f634ae1c8040cef4cc01) ([helloworld/OutputTest.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/OutputTest.jsp))
* [测试每种屏幕操作](https://qiita.com/changkejun/private/3accadd827594d1bccdf) ([helloworld/ActionTest.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/ActionTest.jsp))
* [使用一个标签进行Web文件管理](https://qiita.com/changkejun/private/3f943f089d44d83296af) ([helloworld/helloElfinder.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloElfinder.jsp))
* [使用一个标签创建Web图表](https://qiita.com/changkejun/private/dc976ccaaf82458c7771) ([helloworld/helloChart.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloChart.jsp))
* [使用一个标签创建网页二维码](https://qiita.com/changkejun/private/0cdef7d8d288f9f0a563) ([helloworld/helloBarcode.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloBarcode.jsp))
* [让我们从 POI 毕业](https://qiita.com/changkejun/private/5f6c5b234dc1322ec859) ([helloworld/helloExcelbyPOI.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloExcelbyPOI.jsp))
* [不要害怕千兆字节的文本](https://qiita.com/changkejun/private/97af2b8722c149f5335d) ([helloworld/helloTextCSVThread.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloTextCSVThread.jsp))
* [数据库处理简介](https://qiita.com/changkejun/private/d046d1804b4c996700e2) ([helloworld/helloDB.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloDB.jsp))
* [发送到 Gmail SMTP](https://qiita.com/changkejun/private/26fe53af470ee1a96b05) ([helloworld/helloMail.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloMail.jsp))
* [多语言支持](https://qiita.com/changkejun/private/7d0999b90b0e5370f928) ([helloworld/helloI18n.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloI18n.jsp))
* [让我们创建一个 Rest API 服务](https://qiita.com/changkejun/private/54c3df529a1b83093790) ([helloworld/helloRestAPI.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloRestAPI.jsp))
* [Web应用登录控制和权限控制](https://qiita.com/changkejun/private/c36d3671493225ad14ce) ([skeletonSample](https://github.com/efwGrp/qittaSamples/tree/main/skeletonSample))
* [尝试在 Efw 上通过 Javet 使用 pdf-lib 和 pdfmake](https://qiita.com/changkejun/private/5f50cf3d3e935dd90989) ([hello-pdf-lib3](https://github.com/efwGrp/qittaSamples/tree/main/hello-pdf-lib3), [hello-pdfmake3](https://github.com/efwGrp/qittaSamples/tree/main/hello-pdfmake3))

* [dialog](samples/dialogSample)
* [batch](samples/batchSample)
* [helloAzure](samples/helloAzure)


# API

## 属性

* [efw.properties](help/c/properties.web.md)
* [batch.properties](help/c/properties.batch.md)

## 资源

* [Context XML](help/c/resources.context.md)

## JSP

| 分类 | 项目 |||||
|---|---|---|---|---|---|
| 基本标签 | [Client](help/c/tag.client.md) | [Part](help/c/tag.part.md) | [Attr](help/c/tag.attr.md) | [Msg](help/c/tag.msg.md) | [Prop](help/c/tag.prop.md) |
| 附加标签 | [elFinder](help/c/tag.elfinder.md) | [Chart](help/c/tag.chart.md) | [Barcode](help/c/tag.barcode.md) |  |  |
| 标签参数 | [msg:](help/c/tag.attr.msg.md) | [prop:](help/c/tag.attr.prop.md) |  |  |  |
| 函数 | [Efw](help/c/api_efw_function.md) | [alert](help/c/efw.dialog.alert.md) | [wait](help/c/efw.dialog.wait.md) |  |  |
| 属性 | [data-format](help/c/api_data_format.md) | [data-shortcut](help/c/api_data_shortcut.md) |  |  |  |

## 外置SQL

* [SQL XML](help/c/api_sql.md)

## 外置邮件模板

* [Mail XML](help/c/api_mail.md)

## 多语言

* [Language XML](help/c/api_language.md)

## 事件 JS

* [Web 事件](help/c/api_webevent.md)
* [批量事件](help/c/api_batchevent.md)
* [Rest 事件](help/c/api_restevent.md)
* [全局事件](help/c/api_global.md) 在系统加载时触发。

### 模块

| 模块 | 属性/函数 | 属性/函数 ||||
|---|---|---|---|---|---|
| `[global]` | [`_eventfolder`](help/c/global._eventfolder.md) | [`_isdebug`](help/c/global._isdebug.md) | [`load`](help/c/global.load.md) | [`loadWithNewGlobal`](help/c/global.loadWithNewGlobal.md) | [`loadWithGlobalPool`](help/c/global.loadWithGlobalPool.md) |
| `efw` | [`register`](help/c/efw.register.md) | [`contains`](help/c/efw.contains.md) |  |  |  |
| `cmd` | [`execute`](help/c/cmd.execute.md) |  |  |  |  |
| `file` | [`get`](help/c/file.get.md) | [`list`](help/c/file.list.md) | [`isFile`](help/c/file.isFile.md) | [`isFolder`](help/c/file.isFolder.md) | [`makeFile`](help/c/file.makeFile.md) |
|  | [`exists`](help/c/file.exists.md) | [`duplicate`](help/c/file.duplicate.md) | [`rename`](help/c/file.rename.md) | [`remove`](help/c/file.remove.md) | [`makeDir`](help/c/file.makeDir.md) |
|  | [`readAllLines`](help/c/file.readAllLines.md) | [`writeAllLines`](help/c/file.writeAllLines.md) | [`getStorageFolder`](help/c/file.getStorageFolder.md) | [`saveUploadFiles`](help/c/file.saveUploadFiles.md) | [`saveSingleUploadFile`](help/c/file.saveSingleUploadFile.md) |
|  | [`readAllBytes`](help/c/file.readAllBytes.md) | [`writeAllBytes`](help/c/file.writeAllBytes.md) | [`getTempFileName`](help/c/file.getTempFileName.md) | [`move`](help/c/file.move.md) |  |
| `absfile` | 所有 API 与 `file` 对象相同，除了路径参数是绝对路径。 |  |  |  |  |
| `barcode` | [`decode`](help/c/barcode.decode.md) |  |  |  |  |
| `brms` | [`getRuleById`](help/c/brms.getRuleById.md) | [`getRuleByName`](help/c/brms.getRuleByName.md) | [`getRuleByAlias`](help/c/brms.getRuleByAlias.md) |  |  |
| `rest` | [`get`](help/c/rest.get.md) | [`post`](help/c/rest.post.md) | [`put`](help/c/rest.put.md) | [`delete`](help/c/rest.delete.md) | [`getStatus`](help/c/rest.getStatus.md) |
| `event` | [`fire`](help/c/event.fire.md) |  |  |  |  |
| `db` | [`select`](help/c/db.select.md) | [`change`](help/c/db.change.md) | [`master`](help/c/db.master.md) |  |  |
|  | [`_commit`](help/c/db._commit.md) | [`_rollback`](help/c/db._rollback.md) | [`_commitAll`](help/c/db._commitAll.md) | [`_rollbackAll`](help/c/db._rollbackAll.md) |  |
|  | 所有事务函数，默认情况下，不需要显式调用。 |  |  |  |  |
| `mail` | [`send`](help/c/mail.send.md) |  |  |  |  |
| `properties` | [`get`](help/c/properties.get.md) |  |  |  |  |
| `session` | [`get`](help/c/session.get.md) | [`set`](help/c/session.set.md) | [`create`](help/c/session.create.md) | [`invalidate`](help/c/session.invalidate.md) |  |
| `cookie` | [`get`](help/c/cookie.get.md) | [`set`](help/c/cookie.set.md) |  |  |  |
| `request` | [`get`](help/c/request.get.md) |  |  |  |  |
| `{ any }` | [`format`](help/c/any.format.md) | [`parse`](help/c/any.parse.md) | [`debug`](help/c/any.debug.md) |  |  |
| `{ Date }` | [`getYears`](help/c/Date.getYears.md) |  |  |  |  |
| `{ String }` | [`base64Encode`](help/c/String.base64Encode.md) | [`base64EncodeURI`](help/c/String.base64EncodeURI.md) | [`base64Decode`](help/c/String.base64Decode.md) |  |  |
| `Math` | [`ROUND`](help/c/Math.ROUND.md) | [`ROUNDUP`](help/c/Math.ROUNDUP.md) | [`ROUNDDOWN`](help/c/Math.ROUNDDOWN.md) |  |  |

### 类

| 类 | 属性/函数 |||||
|---|---|---|---|---|---|
| `BinaryReader` | [`new`](help/c/BinaryReader.new.md) | [`readAllLines`](help/c/BinaryReader.readAllLines.md) | [`loopAllLines`](help/c/BinaryReader.loopAllLines.md) |  |  |
| `BinaryWriter` | [`new`](help/c/BinaryWriter.new.md) | [`writeAllLines`](help/c/BinaryWriter.writeAllLines.md) | [`writeLine`](help/c/BinaryWriter.writeLine.md) | [`close`](help/c/BinaryWriter.close.md) |  |
| `TXTReader` | [`new`](help/c/TXTReader.new.md) | [`readAllLines`](help/c/TXTReader.readAllLines.md) | [`loopAllLines`](help/c/TXTReader.loopAllLines.md) |  |  |
| `CSVReader` | [`new`](help/c/CSVReader.new.md) | [`readAllLines`](help/c/CSVReader.readAllLines.md) | [`loopAllLines`](help/c/CSVReader.loopAllLines.md) |  |  |
| `CSVWriter` | [`new`](help/c/CSVWriter.new.md) | [`writeAllLines`](help/c/CSVWriter.writeAllLines.md) | [`writeLine`](help/c/CSVWriter.writeLine.md) | [`close`](help/c/CSVWriter.close.md) |  |
| `Excel` | [`new`](help/c/excel.new.md) | [`save`](help/c/excel.save.md) | [`close`](help/c/excel.close.md) | [`getSheetNames`](help/c/excel.getSheetNames.md) |  |
|  | [`createSheet`](help/c/excel.createSheet.md) | [`removeSheet`](help/c/excel.removeSheet.md) | [`setSheetOrder`](help/c/excel.setSheetOrder.md) | [`setActiveSheet`](help/c/excel.setActiveSheet.md) |  |
|  | [`getMaxRow`](help/c/excel.getMaxRow.md) | [`setPrintArea`](help/c/excel.setPrintArea.md) | [`showSheet`](help/c/excel.showSheet.md) | [`hideSheet`](help/c/excel.hideSheet.md) | [`zoomSheet`](help/c/excel.zoomSheet.md) |
|  | [`addRow`](help/c/excel.addRow.md) | [`delRow`](help/c/excel.delRow.md) | [`showRow`](help/c/excel.showRow.md) | [`hideRow`](help/c/excel.hideRow.md) |  |
|  |  |  | [`showCol`](help/c/excel.showCol.md) | [`hideCol`](help/c/excel.hideCol.md) |  |
|  | [`getArray`](help/c/excel.getArray.md) | [`getSingle`](help/c/excel.getSingle.md) | [`getValue`](help/c/excel.getValue.md) | [`setCell`](help/c/excel.setCell.md) | [`setLink`](help/c/excel.setLink.md) |
|  | [`isEncircled`](help/c/excel.isEncircled.md) | [`encircle`](help/c/excel.encircle.md) | [`addShape`](help/c/excel.addShape.md) | [`addShapeInRange`](help/c/excel.addShapeInRange.md) | [`replacePicture`](help/c/excel.replacePicture.md) |
| `Pdf` | [`new`](help/c/pdf.new.md) | [`save`](help/c/pdf.save.md) | [`close`](help/c/pdf.close.md) | [`setField`](help/c/excel.setField.md) |  |
|  | [`html2pdf`](help/c/pdf.html2pdf.md) | [`getFontNames`](help/c/pdf.getFontNames.md) |
| `Record` | [`new`](help/c/record.new.md) |  |  |  |  |
|  | [`seek`](help/c/record.seek.md) | [`sort`](help/c/record.sort.md) | [`map`](help/c/record.map.md) | [`makeAllKeysUpperCase`](help/c/record.makeAllKeysUpperCase.md) | [`makeAllKeysLowerCase`](help/c/record.makeAllKeysLowerCase.md) |
|  | [`getArray`](help/c/record.getArray.md) | [`getSingle`](help/c/record.getSingle.md) | [`getValue`](help/c/record.getValue.md) | [`length`](help/c/record.length.md) |  |
| `Result` | [`new`](help/c/result.new.md) | [`concat`](help/c/result.concat.md) |  |  |  |
|  | [`runat`](help/c/result.runat.md) | [`remove`](help/c/result.remove.md) | [`append`](help/c/result.append.md) | [`withdata`](help/c/result.withdata.md) |  |
|  | [`show`](help/c/result.show.md) | [`hide`](help/c/result.hide.md) | [`enable`](help/c/result.enable.md) | [`disable`](help/c/result.disable.md) |  |
|  | [`highlight`](help/c/result.highlight.md) | [`attach`](help/c/result.attach.md) | [`deleteAfterDownload`](help/c/result.deleteAfterDownload.md) | [`saveas`](help/c/result.saveas.md) |  |
|  | [`confirm`](help/c/result.confirm.md) | [`alert`](help/c/result.alert.md) | [`focus`](help/c/result.focus.md) | [`eval`](help/c/result.eval.md) | [`navigate`](help/c/result.navigate.md) |
| `Batch` | [`new`](help/c/batch.new.md) | [`concat`](help/c/batch.concat.md) |  |  |  |
|  | [`log`](help/c/batch.log.md) | [`echo`](help/c/batch.echo.md) | [`exit`](help/c/batch.exit.md) |  |  |
| `Threads` | [`new`](help/c/threads.new.md) | [`add`](help/c/threads.add.md) | [`run`](help/c/threads.run.md) |  |  |

# 参考

* [标准 Javascript API](help/c/Standard_Javascript_API.md)
* [jQuery 选择器 API](help/c/jQuery_Selectors_API.md)
* [Nashorn 扩展](https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions)
* [用于 ES6 的 Nashorn 扩展](https://github.com/efwGrp/nashorn-ext-for-es6)
* [HTML](https://www.tohoho-web.com/html/index2.htm)
* [CSS](https://www.tohoho-web.com/css/index.htm)

# 他们使用我们的产品

[![ESCCO](help/img/logos/escco.png)](https://www.escco.co.jp) 
[![YIKE](help/img/logos/yike.jpg)](https://www.escco.com.cn) 
[![JWTS](help/img/logos/jwts.png)](https://www.jwts.co.jp) 
[![LAYER10](help/img/logos/layer10.png)](http://www.layer10.jp/) 
[![SOMPO-JAPAN](help/img/logos/jpn_sompo.jpg)](https://www.sompo-japan.co.jp/) 
[![QUALICA](help/img/logos/qualica.png)](https://www.qualica.co.jp/) 
[![JOT](help/img/logos/jot.png)](https://www.jotnw.or.jp/)