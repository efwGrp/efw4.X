# Excel.setSheetOrder

The `setSheetOrder` function is used to move a sheet's position.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet").setSheetOrder("newSheet", 1);
```

## API

| Calling | Returning |
|---|---|
| `Excel.setSheetOrder(sheetName, order)` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `order` | `Number` | The position of the sheet, starting from 1. |
