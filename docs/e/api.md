# API

## Properties

* [efw.properties](properties.web.md)
* [batch.properties](properties.batch.md)

## Resources

* [Context XML](resources.context.md)

## JSP

| Categories | Items  |||||
|---|---|---|---|---|---|
| Base Tags | [Client](tag.client.md) | [Part](tag.part.md) | [Attr](tag.attr.md) | [Msg](tag.msg.md) | [Prop](tag.prop.md) |
| Additional Tags | [elFinder](tag.elfinder.md) | [Chart](tag.chart.md) | [Barcode](tag.barcode.md) |  |  |
| Tag Params | [msg:](tag.attr.msg.md) | [prop:](tag.attr.prop.md) |  |  |  |
| Functions | [Efw](api_efw_function.md) |  |  |  |  |
| Dialogs | [alert](efw.dialog.alert.md) | [wait](efw.dialog.wait.md) | [preview](efw.dialog.preview.md) | [progress](efw.dialog.progress.md) |  |
| Attributes | [data-format](api_data_format.md) | [data-shortcut](api_data_shortcut.md) |  |  |  |

## Outside SQL

* [SQL XML](api_sql.md)

## Outside Mail

* [Mail XML](api_mail.md)

## Multi Language

* [Language XML](api_language.md)

## Event JS

* [Web Event](api_webevent.md)
* [Batch Event](api_batchevent.md)
* [Rest Event](api_restevent.md)
* [Global Event](api_global.md) fires on system loading.

### Modules

| Modules | Attributes/Functions |||||
|---|---|---|---|---|---|
| `[global]` | [`_eventfolder`](global._eventfolder.md) | [`_isdebug`](global._isdebug.md) | [`load`](global.load.md) | [`loadWithNewGlobal`](global.loadWithNewGlobal.md)※n※d | [`loadWithGlobalPool`](global.loadWithGlobalPool.md)※n※d |
| `efw` | [`register`](efw.register.md) | [`contains`](efw.contains.md) | [`wsSend`](efw.wsSend.md)※ws  |  |  |
| `cmd` | [`execute`](cmd.execute.md) |  |  |  |  |
| `file` | [`get`](file.get.md) | [`list`](file.list.md) | [`isFile`](file.isFile.md) | [`isFolder`](file.isFolder.md) | [`makeFile`](file.makeFile.md) |
|  | [`exists`](file.exists.md) | [`duplicate`](file.duplicate.md) | [`rename`](file.rename.md) | [`remove`](file.remove.md) | [`makeDir`](file.makeDir.md) |
|  | [`readAllLines`](file.readAllLines.md) | [`writeAllLines`](file.writeAllLines.md) | [`getStorageFolder`](file.getStorageFolder.md) | [`saveUploadFiles`](file.saveUploadFiles.md) | [`saveSingleUploadFile`](file.saveSingleUploadFile.md) |
|  | [`readAllBytes`](file.readAllBytes.md) | [`writeAllBytes`](file.writeAllBytes.md) | [`getTempFileName`](file.getTempFileName.md) | [`move`](file.move.md) |  |
| `absfile` | All APIs are the same as the `file` object, except that the path parameter is an absolute one.  |||||
| `brms` | [`getRuleById`](brms.getRuleById.md) | [`getRuleByName`](brms.getRuleByName.md) | [`getRuleByAlias`](brms.getRuleByAlias.md) |  |  |
| `rest` | [`get`](rest.get.md) | [`post`](rest.post.md) | [`put`](rest.put.md) | [`delete`](rest.delete.md) | [`getStatus`](rest.getStatus.md) |
| `event` | [`fire`](event.fire.md) |  |  |  |  |
| `efwEvent` | An alias for `event`, established for TypeScript development.|  |  |  |  |
| `db` | [`select`](db.select.md) | [`change`](db.change.md) | [`master`](db.master.md)※d |  |  |
|  | [`_commit`](db._commit.md) | [`_rollback`](db._rollback.md) | [`_commitAll`](db._commitAll.md) | [`_rollbackAll`](db._rollbackAll.md) |  |
|  | All transaction functions, as a default, do not need to be called explicitly.  |||||
| `mail` | [`send`](mail.send.md) |  |  |  |  |
| `properties` | [`get`](properties.get.md) |  |  |  |  |
| `context` | [`get`](context.get.md) | [`set`](context.set.md) | [`remove`](context.remove.md) |  |  |
| `session`※w | [`get`](session.get.md) | [`set`](session.set.md) | [`create`](session.create.md)※!ws | [`invalidate`](session.invalidate.md) |  |
| `cookie`※w | [`get`](cookie.get.md) | [`set`](cookie.set.md)※!ws |  |  |  |
| `request`※w | [`get`](request.get.md) |  |  |  |  |
| `{ any }` | [`format`](any.format.md) | [`parse`](any.parse.md) | [`debug`](any.debug.md) |  |  |
| `{ Date }` | [`getYears`](Date.getYears.md) |  |  |  |  |
| `{ String }` | [`base64Encode`](String.base64Encode.md) | [`base64EncodeURI`](String.base64EncodeURI.md) | [`base64Decode`](String.base64Decode.md) |  |  |
| `Math` | [`ROUND`](Math.ROUND.md) | [`ROUNDUP`](Math.ROUNDUP.md) | [`ROUNDDOWN`](Math.ROUNDDOWN.md) |  |  |


### Classes

| Classes | Attributes/Functions |||||
|---|---|---|---|---|---|
| `BinaryReader` | [`new`](BinaryReader.new.md) | [`readAllLines`](BinaryReader.readAllLines.md) | [`loopAllLines`](BinaryReader.loopAllLines.md) |  |  |
| `BinaryWriter` | [`new`](BinaryWriter.new.md) | [`writeAllLines`](BinaryWriter.writeAllLines.md) | [`writeLine`](BinaryWriter.writeLine.md) | [`close`](BinaryWriter.close.md) |  |
| `TXTReader`※d | [`new`](TXTReader.new.md) | [`readAllLines`](TXTReader.readAllLines.md) | [`loopAllLines`](TXTReader.loopAllLines.md) |  |  |
| `CSVReader` | [`new`](CSVReader.new.md) | [`readAllLines`](CSVReader.readAllLines.md) | [`loopAllLines`](CSVReader.loopAllLines.md) |  |  |
| `CSVWriter` | [`new`](CSVWriter.new.md) | [`writeAllLines`](CSVWriter.writeAllLines.md) | [`writeLine`](CSVWriter.writeLine.md) | [`close`](CSVWriter.close.md) |  |
| `Excel` | [`new`](excel.new.md) | [`save`](excel.save.md) | [`close`](excel.close.md) | [`getSheetNames`](excel.getSheetNames.md) |  |
|  | [`createSheet`](excel.createSheet.md) | [`removeSheet`](excel.removeSheet.md) | [`setSheetOrder`](excel.setSheetOrder.md) | [`setActiveSheet`](excel.setActiveSheet.md) |  |
|  | [`getMaxRow`](excel.getMaxRow.md) | [`setPrintArea`](excel.setPrintArea.md) | [`showSheet`](excel.showSheet.md) | [`hideSheet`](excel.hideSheet.md) | [`zoomSheet`](excel.zoomSheet.md) |
|  | [`addRow`](excel.addRow.md) | [`delRow`](excel.delRow.md) | [`showRow`](excel.showRow.md) | [`hideRow`](excel.hideRow.md) |  |
|  |  |  | [`showCol`](excel.showCol.md) | [`hideCol`](excel.hideCol.md) |  |
|  | [`getArray`](excel.getArray.md) | [`getSingle`](excel.getSingle.md) | [`getValue`](excel.getValue.md) | [`setCell`](excel.setCell.md) | [`setLink`](excel.setLink.md) |
|  | [`isEncircled`](excel.isEncircled.md) | [`encircle`](excel.encircle.md) | [`addShape`](excel.addShape.md) | [`addShapeInRange`](excel.addShapeInRange.md) | [`replacePicture`](excel.replacePicture.md) |
| `Pdf` | [`new`](pdf.new.md) | [`save`](pdf.save.md) | [`close`](pdf.close.md) | [`setField`](pdf.setField.md) |  |
|  | [`html2pdf`](pdf.html2pdf.md) | [`getFontNames`](pdf.getFontNames.md) |
| `Record` | [`new`](record.new.md) |  |  |  |  |
|  | [`seek`](record.seek.md) | [`sort`](record.sort.md) | [`map`](record.map.md) | [`makeAllKeysUpperCase`](record.makeAllKeysUpperCase.md) | [`makeAllKeysLowerCase`](record.makeAllKeysLowerCase.md) |
|  | [`group`](record.group.md) | [`getArray`](record.getArray.md) | [`getSingle`](record.getSingle.md) | [`getValue`](record.getValue.md) | [`length`](record.length.md) | |
| `EfwRecord` | An alias for `Record`, established for TypeScript development.|  |  |  |  |
| `Result`※w | [`new`](result.new.md) | [`concat`](result.concat.md) |  |  |  |
|  | [`runat`](result.runat.md) | [`remove`](result.remove.md) | [`append`](result.append.md) | [`withdata`](result.withdata.md) |  |
|  | [`show`](result.show.md) | [`hide`](result.hide.md) | [`enable`](result.enable.md) | [`disable`](result.disable.md) |  |
|  | [`focus`](result.focus.md) | [`highlight`](result.highlight.md) | [`attach`](result.attach.md) | [`deleteAfterDownload`](result.deleteAfterDownload.md) | [`saveas`](result.saveas.md) |  |
|  | [`confirm`](result.confirm.md) | [`alert`](result.alert.md) | [`preview`](result.preview.md) | [`progress`](result.progress.md) |  |
|  | [`eval`](result.eval.md) | [`provide`](result.provide.md)※!nprms※!ws | [`navigate`](result.navigate.md) |  |  |  |
| `Batch`※b | [`new`](batch.new.md) | [`concat`](batch.concat.md) |  |  |  |
|  | [`log`](batch.log.md) | [`echo`](batch.echo.md) | [`exit`](batch.exit.md) |  |  |
| `Threads`※n※d | [`new`](threads.new.md) | [`add`](threads.add.md) | [`run`](threads.run.md) |  |  |

- ※n : Only enable when the script engine is nashorn.
- ※d : Deprecated with the intent to remove them in future.
- ※w : Only enable for web event.
- ※b : Only enable for batch event.
- ※ws : Only enable when Efw function is in websocket mode.
- ※!ws : Not enable when Efw function is in websocket mode.
- ※!nprms : Not enable when Client tag is in nopromise mode.

# References

* [HTML](https://www.tohoho-web.com/html/index2.htm)
* [CSS](https://www.tohoho-web.com/css/index.htm)
* [jQuery Selectors API](jQuery_Selectors_API.md)
* [Standard Javascript API](Standard_Javascript_API.md)
* [Nashorn Extensions](https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions)
* [Nashorn Ext for ES6](https://github.com/efwGrp/nashorn-ext-for-es6)
* [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
* [Graaljs Java Interoperability](https://www.graalvm.org/latest/reference-manual/js/JavaInteroperability/)
