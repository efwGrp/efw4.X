# Excel.setSheetOrder

`setSheetOrder`関数は、シートの位置を移動するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet").setSheetOrder("newSheet", 1);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel.setSheetOrder(sheetName, order)` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `order` | `Number` | シートの位置。1から始まります。 |