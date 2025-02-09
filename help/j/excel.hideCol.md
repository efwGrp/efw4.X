# Excel.hideCol

`hideCol`関数は、シート内の列を非表示にするために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.hideCol("mySheet",2,4);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. hideCol ( sheetName, startCol, endCol )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `startCol` | `Number` | 非表示にする範囲の開始列。0から始まります。 |
| `endCol` | `Number` | 非表示にする範囲の終了列。0から始まります。 |