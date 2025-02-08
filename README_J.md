[English](README.md)

# efw4.X

## はじめに

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Efw Flow](./help/img/efw_flow.png)](./help/img/efw_flow_org.png)<br>
[![Efw Client](./help/img/efw_client.png)](./help/img/efw_client_org.png)
[![Efw Server](./help/img/efw_server.png)](./help/img/efw_server_org.png)

* [Efwとは](https://qiita.com/changkejun/items/d9ef1bbffecb8dab4ffc)
* [Efwのセキュリティ関連の説明](https://qiita.com/changkejun/items/5e10a96e0b1efce8653e)
* [高負荷対応のTomcat環境構築](https://qiita.com/changkejun/items/1d850b109f8b26381268)
* [EFWコーディング規約](https://qiita.com/Victory963/items/ec028606e382a1d3a174)

## サンプル

* [各種類の入力枠を一括テスト](https://qiita.com/changkejun/items/926a29ef46714d8cf9f1) ([helloworld/InputTest.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/InputTest.jsp))
* [各種類の値表示をテストする](https://qiita.com/changkejun/items/194b6c300c82167acddc) ([helloworld/OutputTest.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/OutputTest.jsp))
* [各種類の画面アクションをテストする](https://qiita.com/changkejun/items/c1369438843759d0e890) ([helloworld/ActionTest.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/ActionTest.jsp))
* [タグ１つでwebのファイル管理](https://qiita.com/changkejun/items/d79127e27b49bfc8a847) ([helloworld/helloElfinder.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloElfinder.jsp))
* [タグ１つでwebのチャート機能](https://qiita.com/changkejun/items/b563570df2036f5fa7da) ([helloworld/helloChart.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloChart.jsp))
* [タグ１つでwebのQRコード作成](https://qiita.com/changkejun/items/106f2734dd319e9b1201) ([helloworld/helloBarcode.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloBarcode.jsp))
* [POIから卒業しましょう](https://qiita.com/changkejun/items/dea128563b608b7dcb43) ([helloworld/helloExcelbyPOI.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloExcelbyPOI.jsp))
* [ギガバイトのテキストを恐れなし](https://qiita.com/changkejun/items/2777f3006c4a0b8d2213) ([helloworld/helloTextCSVThread.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloTextCSVThread.jsp))
* [efwのデータベース処理に関する紹介](https://qiita.com/changkejun/items/b273b3ae64c76e5b016a) ([helloworld/helloDB.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloDB.jsp))
* [efwを利用してGmailのSMTPへ送信](https://qiita.com/changkejun/items/c237ddbc69c9c4cb3319) ([helloworld/helloMail.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloMail.jsp))
* [efwの多国語対応](https://qiita.com/changkejun/items/e4afa094a606c14698f3) ([helloworld/helloI18n.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloI18n.jsp))
* [Rest API サービスを作りましょう](https://qiita.com/changkejun/items/70ac1778acd146ad0f9c) ([helloworld/helloRestAPI.jsp](https://github.com/efwGrp/qittaSamples/tree/main/helloworld/helloRestAPI.jsp))
* [efwのwebアプリのログイン制御＆権限制御](https://qiita.com/changkejun/items/2e7a68149eab8f2281cf) ([skeletonSample](https://github.com/efwGrp/qittaSamples/tree/main/skeletonSample))
* [Javetを利用して、pdf-libとpdfmakeをefwに使ってみる](https://qiita.com/changkejun/items/350ca12a3276c4d1378a) ([hello-pdf-lib3](https://github.com/efwGrp/qittaSamples/tree/main/hello-pdf-lib3), [hello-pdfmake3](https://github.com/efwGrp/qittaSamples/tree/main/hello-pdfmake3))

* [dialog](samples/dialogSample)
* [batch](samples/batchSample)
* [helloAzure](samples/helloAzure)


# API

## プロパティ

* [efw.properties](help/j/properties.web.md)
* [batch.properties](help/j/properties.batch.md)

## リソース

* [Context XML](help/j/resources.context.md)

## JSP

| カテゴリ | 項目 |  |  |  |  |
|---|---|---|---|---|---|
| 基本タグ | [Client](help/j/tag.client.md) | [Part](help/j/tag.part.md) | [Attr](help/j/tag.attr.md) | [Msg](help/j/tag.msg.md) | [Prop](help/j/tag.prop.md) |
| 追加タグ | [elFinder](help/j/tag.elfinder.md) | [Chart](help/j/tag.chart.md) | [Barcode](help/j/tag.barcode.md) |  |  |
| タグパラメータ | [msg:](help/j/tag.attr.msg.md) | [prop:](help/j/tag.attr.prop.md) |  |  |  |
| 関数 | [Efw](help/j/api_efw_function.md) | [alert](help/j/efw.dialog.alert.md) | [wait](help/j/efw.dialog.wait.md) |  |  |
| 属性 | [data-format](help/j/api_data_format.md) | [data-shortcut](help/j/api_data_shortcut.md) |  |  |  |

## 外だしSQL

* [SQL XML](help/j/api_sql.md)

## メールテンプレート

* [Mail XML](help/j/api_mail.md)

## 多国語

* [Language XML](help/j/api_language.md)

## イベントJS

* [Web Event](help/j/api_webevent.md)
* [Batch Event](help/j/api_batchevent.md)
* [Rest Event](help/j/api_restevent.md)
* [Global Event](help/j/api_global.md) (システム読み込み時に発火)

### モジュール

| モジュール | 属性/関数 |  |  |  |  |
|---|---|---|---|---|---|
| `[global]` | [`_eventfolder`](help/j/global._eventfolder.md) | [`_isdebug`](help/j/global._isdebug.md) | [`load`](help/j/global.load.md) | [`loadWithNewGlobal`](help/j/global.loadWithNewGlobal.md) | [`loadWithGlobalPool`](help/j/global.loadWithGlobalPool.md) |
| `efw` | [`register`](help/j/efw.register.md) | [`contains`](help/j/efw.contains.md) |  |  |  |
| `cmd` | [`execute`](help/j/cmd.execute.md) |  |  |  |  |
| `file` | [`get`](help/j/file.get.md) | [`list`](help/j/file.list.md) | [`isFile`](help/j/file.isFile.md) | [`isFolder`](help/j/file.isFolder.md) | [`makeFile`](help/j/file.makeFile.md) |
|  | [`exists`](help/j/file.exists.md) | [`duplicate`](help/j/file.duplicate.md) | [`rename`](help/j/file.rename.md) | [`remove`](help/j/file.remove.md) | [`makeDir`](help/j/file.makeDir.md) |
|  | [`readAllLines`](help/j/file.readAllLines.md) | [`writeAllLines`](help/j/file.writeAllLines.md) | [`getStorageFolder`](help/j/file.getStorageFolder.md) | [`saveUploadFiles`](help/j/file.saveUploadFiles.md) | [`saveSingleUploadFile`](help/j/file.saveSingleUploadFile.md) |
|  | [`readAllBytes`](help/j/file.readAllBytes.md) | [`writeAllBytes`](help/j/file.writeAllBytes.md) | [`getTempFileName`](help/j/file.getTempFileName.md) | [`move`](help/j/file.move.md) |  |
| `absfile` | すべてのAPIは`file`オブジェクトと同じですが、パスパラメータが絶対パスである点が異なります。 |  |  |  |  |
| `barcode` | [`decode`](help/j/barcode.decode.md) |  |  |  |  |
| `brms` | [`getRuleById`](help/j/brms.getRuleById.md) | [`getRuleByName`](help/j/brms.getRuleByName.md) | [`getRuleByAlias`](help/j/brms.getRuleByAlias.md) |  |  |
| `rest` | [`get`](help/j/rest.get.md) | [`post`](help/j/rest.post.md) | [`put`](help/j/rest.put.md) | [`delete`](help/j/rest.delete.md) | [`getStatus`](help/j/rest.getStatus.md) |
| `event` | [`fire`](help/j/event.fire.md) |  |  |  |  |
| `db` | [`select`](help/j/db.select.md) | [`change`](help/j/db.change.md) | [`master`](help/j/db.master.md) |  |  |
|  | [`_commit`](help/j/db._commit.md) | [`_rollback`](help/j/db._rollback.md) | [`_commitAll`](help/j/db._commitAll.md) | [`_rollbackAll`](help/j/db._rollbackAll.md) |  |
|  | すべてのトランザクション関数は、デフォルトで明示的に呼び出す必要はありません。 |  |  |  |  |
| `mail` | [`send`](help/j/mail.send.md) |  |  |  |  |
| `properties` | [`get`](help/j/properties.get.md) |  |  |  |  |
| `session` | [`get`](help/j/session.get.md) | [`set`](help/j/session.set.md) | [`create`](help/j/session.create.md) | [`invalidate`](help/j/session.invalidate.md) |  |
| `cookie` | [`get`](help/j/cookie.get.md) | [`set`](help/j/cookie.set.md) |  |  |  |
| `request` | [`get`](help/j/request.get.md) |  |  |  |  |
| `{ any }` | [`format`](help/j/any.format.md) | [`parse`](help/j/any.parse.md) | [`debug`](help/j/any.debug.md) |  |  |
| `{ Date }` | [`getYears`](help/j/Date.getYears.md) |  |  |  |  |
| `{ String }` | [`base64Encode`](help/j/String.base64Encode.md) | [`base64EncodeURI`](help/j/String.base64EncodeURI.md) | [`base64Decode`](help/j/String.base64Decode.md) |  |  |
| `Math` | [`ROUND`](help/j/Math.ROUND.md) | [`ROUNDUP`](help/j/Math.ROUNDUP.md) | [`ROUNDDOWN`](help/j/Math.ROUNDDOWN.md) |  |  |


### クラス

| クラス | 属性/関数 |  |  |  |  |
|---|---|---|---|---|---|
| `BinaryReader` | [`new`](help/j/BinaryReader.new.md) | [`readAllLines`](help/j/BinaryReader.readAllLines.md) | [`loopAllLines`](help/j/BinaryReader.loopAllLines.md) |  |  |
| `TXTReader` | [`new`](help/j/TXTReader.new.md) | [`readAllLines`](help/j/TXTReader.readAllLines.md) | [`loopAllLines`](help/j/TXTReader.loopAllLines.md) |  |  |
| `CSVReader` | [`new`](help/j/CSVReader.new.md) | [`readAllLines`](help/j/CSVReader.readAllLines.md) | [`loopAllLines`](help/j/CSVReader.loopAllLines.md) |  |  |
| `CSVWriter` | [`new`](help/j/CSVWriter.new.md) | [`writeAllLines`](help/j/CSVWriter.writeAllLines.md) | [`writeLine`](help/j/CSVWriter.writeLine.md) | [`close`](help/j/CSVWriter.close.md) |  |
| `Excel` | [`new`](help/j/excel.new.md) | [`save`](help/j/excel.save.md) | [`close`](help/j/excel.close.md) | [`getSheetNames`](help/j/excel.getSheetNames.md) |  |
|  | [`createSheet`](help/j/excel.createSheet.md) | [`removeSheet`](help/j/excel.removeSheet.md) | [`setSheetOrder`](help/j/excel.setSheetOrder.md) | [`setActiveSheet`](help/j/excel.setActiveSheet.md) |  |
|  | [`getMaxRow`](help/j/excel.getMaxRow.md) | [`setPrintArea`](help/j/excel.setPrintArea.md) | [`showSheet`](help/j/excel.showSheet.md) | [`hideSheet`](help/j/excel.hideSheet.md) | [`zoomSheet`](help/j/excel.zoomSheet.md) |
|  | [`addRow`](help/j/excel.addRow.md) | [`delRow`](help/j/excel.delRow.md) | [`showRow`](help/j/excel.showRow.md) | [`hideRow`](help/j/excel.hideRow.md) |  |
|  |  |  | [`showCol`](help/j/excel.showCol.md) | [`hideCol`](help/j/excel.hideCol.md) |  |
|  | [`getArray`](help/j/excel.getArray.md) | [`getSingle`](help/j/excel.getSingle.md) | [`getValue`](help/j/excel.getValue.md) | [`setCell`](help/j/excel.setCell.md) | [`setLink`](help/j/excel.setLink.md) |
|  | [`isEncircled`](help/j/excel.isEncircled.md) | [`encircle`](help/j/excel.encircle.md) | [`addShape`](help/j/excel.addShape.md) | [`addShapeInRange`](help/j/excel.addShapeInRange.md) | [`replacePicture`](help/j/excel.replacePicture.md) |
| `Record` | [`new`](help/j/record.new.md) |  |  |  |  |
|  | [`seek`](help/j/record.seek.md) | [`sort`](help/j/record.sort.md) | [`map`](help/j/record.map.md) | [`makeAllKeysUpperCase`](help/j/record.makeAllKeysUpperCase.md) | [`makeAllKeysLowerCase`](help/j/record.makeAllKeysLowerCase.md) |
|  | [`getArray`](help/j/record.getArray.md) | [`getSingle`](help/j/record.getSingle.md) | [`getValue`](help/j/record.getValue.md) | [`length`](help/j/record.length.md) |  |
| `Result` | [`new`](help/j/result.new.md) | [`concat`](help/j/result.concat.md) |  |  |  |
|  | [`runat`](help/j/result.runat.md) | [`remove`](help/j/result.remove.md) | [`append`](help/j/result.append.md) | [`withdata`](help/j/result.withdata.md) |  |
|  | [`show`](help/j/result.show.md) | [`hide`](help/j/result.hide.md) | [`enable`](help/j/result.enable.md) | [`disable`](help/j/result.disable.md) |  |
|  | [`highlight`](help/j/result.highlight.md) | [`attach`](help/j/result.attach.md) | [`deleteAfterDownload`](help/j/result.deleteAfterDownload.md) | [`saveas`](help/j/result.saveas.md) |  |
|  | [`confirm`](help/j/result.confirm.md) | [`alert`](help/j/result.alert.md) | [`focus`](help/j/result.focus.md) | [`eval`](help/j/result.eval.md) | [`navigate`](help/j/result.navigate.md) |
| `Batch` | [`new`](help/j/batch.new.md) | [`concat`](help/j/batch.concat.md) |  |  |  |
|  | [`log`](help/j/batch.log.md) | [`echo`](help/j/batch.echo.md) | [`exit`](help/j/batch.exit.md) |  |  |
| `Threads` | [`new`](help/j/threads.new.md) | [`add`](help/j/threads.add.md) | [`run`](help/j/threads.run.md) |  |  |


# 参考文献

* [標準Javascript API](help/j/Standard_Javascript_API.md)
* [jQueryセレクターAPI](help/j/jQuery_Selectors_API.md)
* [Nashorn拡張](https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions)
* [ES6用Nashorn Ext](https://github.com/efwGrp/nashorn-ext-for-es6)
* [HTML](https://www.tohoho-web.com/html/index2.htm)
* [CSS](https://www.tohoho-web.com/css/index.htm)

# 導入事例

[![ESCCO](help/img/logos/escco.png)](https://www.escco.co.jp) 
[![YIKE](help/img/logos/yike.jpg)](https://www.escco.com.cn) 
[![JWTS](help/img/logos/jwts.png)](https://www.jwts.co.jp) 
[![LAYER10](help/img/logos/layer10.png)](http://www.layer10.jp/) 
[![SOMPO-JAPAN](help/img/logos/jpn_sompo.jpg)](https://www.sompo-japan.co.jp/) 
[![QUALICA](help/img/logos/qualica.png)](https://www.qualica.co.jp/) 
[![JOT](help/img/logos/jot.png)](https://www.jotnw.or.jp/)
