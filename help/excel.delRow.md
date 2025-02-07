# Excel.delRow

The `delRow` function is used to delete rows in a sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.delRow("mySheet",0);
excel.delRow("mySheet",1,10);
```
## API

| Calling | Returning |
|---|---|
| `Excel.delRow(sheetName, startRow)` | `Excel` |
| `Excel.delRow(sheetName, startRow, n)` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `startRow` | `Number` | The row index from which rows will be deleted. Indexed from 0. |
| `n` | `Number` | The number of rows to be deleted. The default value is 1. |