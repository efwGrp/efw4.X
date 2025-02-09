# Excel.setCell

`setCell`関数は、セルに値、スタイルなどを設定するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.setCell("newSheet", "A1", "hell world!")					// セルに値を設定する場合。
.setCell("newSheet", "B1", "hell world!", "Sheet1", "A1")	// セルに値を設定し、別のセルからスタイルをコピーする場合。
.setCell("newSheet", "C1", null, "Sheet1", "A2");			// 値がnullの場合、数式の設定を試みます。
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. setCell ( sheetName, position, value )` | `Excel` |
| `excel. setCell ( sheetName, position, value, templateSheetName, templatePosition )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `position` | `String` | セルの絶対参照。 |
| `value` | `String` \| `Number` \| `Date` \| `Boolean` \| `null` | セルに設定する値。`null`の場合、数式の設定を試みます。 |
| `templateSheetName` | `String` | テンプレートシート名。 |
| `templatePosition` | `String` | テンプレートセルの絶対参照。 |