# Excel.getMaxRow

The `getMaxRow` function is used to retrieve the last row number, starting from 1.

## Sample

```javascript
var excel = new Excel("test.xlsx");
var maxrow = excel.getMaxRow("Sheet1");
```

## API

| Calling | Returning |
|---|---|
| `Excel.getMaxRow(sheetName)` | `Number` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
