# API

## 属性

* [efw.properties](properties.web.md)
* [batch.properties](properties.batch.md)

## 资源

* [Context XML](resources.context.md)

## JSP

| 分类 | 项目 |||||
|---|---|---|---|---|---|
| 基本标签 | [Client](tag.client.md) | [Part](tag.part.md) | [Attr](tag.attr.md) | [Msg](tag.msg.md) | [Prop](tag.prop.md) |
| 附加标签 | [elFinder](tag.elfinder.md) | [Chart](tag.chart.md) | [Barcode](tag.barcode.md) | | |
| 标签参数 | [msg:](tag.attr.msg.md) | [prop:](tag.attr.prop.md) | | | |
| 函数 | [Efw](api_efw_function.md) | [alert](efw.dialog.alert.md) | [wait](efw.dialog.wait.md) | | |
| 属性 | [data-format](api_data_format.md) | [data-shortcut](api_data_shortcut.md) | | | |

## 外置SQL

* [SQL XML](api_sql.md)

## 外置邮件模板

* [Mail XML](api_mail.md)

## 多语言

* [Language XML](api_language.md)

## 事件 JS

* [Web 事件](api_webevent.md)
* [批量事件](api_batchevent.md)
* [Rest 事件](api_restevent.md)
* [全局事件](api_global.md) 在系统加载时触发。

### 模块

| 模块 | 属性/函数 | 属性/函数 ||||
|---|---|---|---|---|---|
| `[global]` | [`_eventfolder`](global._eventfolder.md) | [`_isdebug`](global._isdebug.md) | [`load`](global.load.md) | [`loadWithNewGlobal`](global.loadWithNewGlobal.md) | [`loadWithGlobalPool`](global.loadWithGlobalPool.md) |
| `efw` | [`register`](efw.register.md) | [`contains`](efw.contains.md) | | | |
| `cmd` | [`execute`](cmd.execute.md) | | | | |
| `file` | [`get`](file.get.md) | [`list`](file.list.md) | [`isFile`](file.isFile.md) | [`isFolder`](file.isFolder.md) | [`makeFile`](file.makeFile.md) |
| | [`exists`](file.exists.md) | [`duplicate`](file.duplicate.md) | [`rename`](file.rename.md) | [`remove`](file.remove.md) | [`makeDir`](file.makeDir.md) |
| | [`readAllLines`](file.readAllLines.md) | [`writeAllLines`](file.writeAllLines.md) | [`getStorageFolder`](file.getStorageFolder.md) | [`saveUploadFiles`](file.saveUploadFiles.md) | [`saveSingleUploadFile`](file.saveSingleUploadFile.md) |
| | [`readAllBytes`](file.readAllBytes.md) | [`writeAllBytes`](file.writeAllBytes.md) | [`getTempFileName`](file.getTempFileName.md) | [`move`](file.move.md) | |
| `absfile` | 所有 API 与 `file` 对象相同，除了路径参数是绝对路径。 | | | | |
| `barcode` | [`decode`](barcode.decode.md) | | | | |
| `brms` | [`getRuleById`](brms.getRuleById.md) | [`getRuleByName`](brms.getRuleByName.md) | [`getRuleByAlias`](brms.getRuleByAlias.md) | | |
| `rest` | [`get`](rest.get.md) | [`post`](rest.post.md) | [`put`](rest.put.md) | [`delete`](rest.delete.md) | [`getStatus`](rest.getStatus.md) |
| `event` | [`fire`](event.fire.md) | | | | |
| `db` | [`select`](db.select.md) | [`change`](db.change.md) | [`master`](db.master.md) | | |
| | [`_commit`](db._commit.md) | [`_rollback`](db._rollback.md) | [`_commitAll`](db._commitAll.md) | [`_rollbackAll`](db._rollbackAll.md) | |
| | 所有事务函数，默认情况下，不需要显式调用。 | | | | |
| `mail` | [`send`](mail.send.md) | | | | |
| `properties` | [`get`](properties.get.md) | | | | |
| `session` | [`get`](session.get.md) | [`set`](session.set.md) | [`create`](session.create.md) | [`invalidate`](session.invalidate.md) | |
| `cookie` | [`get`](cookie.get.md) | [`set`](cookie.set.md) | | | |
| `request` | [`get`](request.get.md) | | | | |
| `{ any }` | [`format`](any.format.md) | [`parse`](any.parse.md) | [`debug`](any.debug.md) | | |
| `{ Date }` | [`getYears`](Date.getYears.md) | | | | |
| `{ String }` | [`base64Encode`](String.base64Encode.md) | [`base64EncodeURI`](String.base64EncodeURI.md) | [`base64Decode`](String.base64Decode.md) | | |
| `Math` | [`ROUND`](Math.ROUND.md) | [`ROUNDUP`](Math.ROUNDUP.md) | [`ROUNDDOWN`](Math.ROUNDDOWN.md) | | |

### 类

| 类 | 属性/函数 |||||
|---|---|---|---|---|---|
| `BinaryReader` | [`new`](BinaryReader.new.md) | [`readAllLines`](BinaryReader.readAllLines.md) | [`loopAllLines`](BinaryReader.loopAllLines.md) | | |
| `BinaryWriter` | [`new`](BinaryWriter.new.md) | [`writeAllLines`](BinaryWriter.writeAllLines.md) | [`writeLine`](BinaryWriter.writeLine.md) | [`close`](BinaryWriter.close.md) |  |
| `TXTReader` | [`new`](TXTReader.new.md) | [`readAllLines`](TXTReader.readAllLines.md) | [`loopAllLines`](TXTReader.loopAllLines.md) | | |
| `CSVReader` | [`new`](CSVReader.new.md) | [`readAllLines`](CSVReader.readAllLines.md) | [`loopAllLines`](CSVReader.loopAllLines.md) | | |
| `CSVWriter` | [`new`](CSVWriter.new.md) | [`writeAllLines`](CSVWriter.writeAllLines.md) | [`writeLine`](CSVWriter.writeLine.md) | [`close`](CSVWriter.close.md) | |
| `Excel` | [`new`](excel.new.md) | [`save`](excel.save.md) | [`close`](excel.close.md) | [`getSheetNames`](excel.getSheetNames.md) | |
| | [`createSheet`](excel.createSheet.md) | [`removeSheet`](excel.removeSheet.md) | [`setSheetOrder`](excel.setSheetOrder.md) | [`setActiveSheet`](excel.setActiveSheet.md) | |
| | [`getMaxRow`](excel.getMaxRow.md) | [`setPrintArea`](excel.setPrintArea.md) | [`showSheet`](excel.showSheet.md) | [`hideSheet`](excel.hideSheet.md) | [`zoomSheet`](excel.zoomSheet.md) |
| | [`addRow`](excel.addRow.md) | [`delRow`](excel.delRow.md) | [`showRow`](excel.showRow.md) | [`hideRow`](excel.hideRow.md) | |
| | | | [`showCol`](excel.showCol.md) | [`hideCol`](excel.hideCol.md) | |
| | [`getArray`](excel.getArray.md) | [`getSingle`](excel.getSingle.md) | [`getValue`](excel.getValue.md) | [`setCell`](excel.setCell.md) | [`setLink`](excel.setLink.md) |
| | [`isEncircled`](excel.isEncircled.md) | [`encircle`](excel.encircle.md) | [`addShape`](excel.addShape.md) | [`addShapeInRange`](excel.addShapeInRange.md) | [`replacePicture`](excel.replacePicture.md) |
| `Pdf` | [`new`](pdf.new.md) | [`save`](pdf.save.md) | [`close`](pdf.close.md) | [`setField`](pdf.setField.md) |  |
|  | [`html2pdf`](pdf.html2pdf.md) | [`getFontNames`](pdf.getFontNames.md) |
| `Record` | [`new`](record.new.md) | | | | |
| | [`seek`](record.seek.md) | [`sort`](record.sort.md) | [`map`](record.map.md) | [`makeAllKeysUpperCase`](record.makeAllKeysUpperCase.md) | [`makeAllKeysLowerCase`](record.makeAllKeysLowerCase.md) |
| | [`getArray`](record.getArray.md) | [`getSingle`](record.getSingle.md) | [`getValue`](record.getValue.md) | [`length`](record.length.md) | |
| `Result` | [`new`](result.new.md) | [`concat`](result.concat.md) | [`provide`](result.provide.md) | | |
| | [`runat`](result.runat.md) | [`remove`](result.remove.md) | [`append`](result.append.md) | [`withdata`](result.withdata.md) | |
| | [`show`](result.show.md) | [`hide`](result.hide.md) | [`enable`](result.enable.md) | [`disable`](result.disable.md) | |
| | [`focus`](result.focus.md) | [`highlight`](result.highlight.md) | [`attach`](result.attach.md) | [`deleteAfterDownload`](result.deleteAfterDownload.md) | [`saveas`](result.saveas.md) | |
| | [`confirm`](result.confirm.md) | [`alert`](result.alert.md) | [`preview`](result.preview.md) | [`eval`](result.eval.md) | [`navigate`](result.navigate.md) |
| `Batch` | [`new`](batch.new.md) | [`concat`](batch.concat.md) | | | |
| | [`log`](batch.log.md) | [`echo`](batch.echo.md) | [`exit`](batch.exit.md) | | |
| `Threads` | [`new`](threads.new.md) | [`add`](threads.add.md) | [`run`](threads.run.md) | | |

# 参考

* [标准 Javascript API](Standard_Javascript_API.md)
* [jQuery 选择器 API](jQuery_Selectors_API.md)
* [Nashorn 扩展](https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions)
* [用于 ES6 的 Nashorn 扩展](https://github.com/efwGrp/nashorn-ext-for-es6)
* [HTML](https://www.tohoho-web.com/html/index2.htm)
* [CSS](https://www.tohoho-web.com/css/index.htm)