# Excel.hideRow

`hideRow`関数は、シート内の行を非表示にするために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.hideRow("mySheet",2,4);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. hideRow ( sheetName, startRow, endRow )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `startRow` | `Number` | 非表示にする範囲の開始行。0から始まります。 |
| `endRow` | `Number` | 非表示にする範囲の終了行。0から始まります。 |