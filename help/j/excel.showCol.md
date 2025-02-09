# Excel.showCol

`showCol`関数は、シート内の列を表示するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.showCol("mySheet",2,4);
```
## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. showCol ( sheetName, startCol, endCol )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `startCol` | `Number` | 表示する範囲の開始列。0から始まります。 |
| `endCol` | `Number` | 表示する範囲の終了列。0から始まります。 |