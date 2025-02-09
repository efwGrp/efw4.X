# Excel.showRow

`showRow`関数は、シート内の行を表示するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.showRow("mySheet",2,4);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. showRow ( sheetName, startRow, endRow )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `startRow` | `Number` | 表示する範囲の開始行。0から始まります。 |
| `endRow` | `Number` | 表示する範囲の終了行。0から始まります。 |