# Excel.getMaxRow

`getMaxRow`関数は、最後の行番号（1から始まる）を取得するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
var maxrow = excel.getMaxRow("Sheet1");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. getMaxRow ( sheetName )` | `Number` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |