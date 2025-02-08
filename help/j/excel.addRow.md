# Excel.addRow

`addRow`関数は、シートに行を追加するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.addRow("mySheet",0);
excel.addRow("mySheet",1,10);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. addRow ( sheetName, startRow )` | `Excel` |
| `excel. addRow ( sheetName, startRow, n )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `startRow` | `Number` | 新しい行が追加される*前*の行インデックス。0から始まります。 |
| `n` | `Number` | 追加する空白行数。デフォルト値は1です。 |