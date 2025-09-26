# Excel.setPrintArea

`setPrintArea`関数は、シートの印刷領域を設定するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.setPrintArea("mySheet",0,10,0,100);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. setPrintArea ( sheetName, startRow, endRow, startCol, endCol )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `startRow` | `Number` | 印刷する範囲の開始行。0から始まります。 |
| `endRow` | `Number` | 印刷する範囲の終了行。0から始まります。 |
| `startCol` | `Number` | 印刷する範囲の開始列。0から始まります。 |
| `endCol` | `Number` | 印刷する範囲の終了列。0から始まります。 |