# Excel.setLink

`setLink`関数は、セルにリンクを設定するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.createSheet("linkSheet")
.setLink("newSheet","A1","#\'linkSheet\'!A1");		// セルにリンクを設定する場合。
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. setLink ( sheetName, position, linkUrl )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `position` | `String` | リンクを追加するセルの位置。 |
| `linkUrl` | `String` | シートにリンクするためのURL。 |