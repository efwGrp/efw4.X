# Excel.delRow

`delRow`関数は、シート内の行を削除するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.delRow("mySheet",0);
excel.delRow("mySheet",1,10);
```
## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. delRow ( sheetName, startRow )` | `Excel` |
| `excel. delRow ( sheetName, startRow, n )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `startRow` | `Number` | 行が削除される開始行インデックス。0から始まります。 |
| `n` | `Number` | 削除する行数。デフォルト値は1です。 |