# Excel.addRow

The `addRow` function is used to add rows to a sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.addRow("mySheet",0);
excel.addRow("mySheet",1,10);
```

## API

| Calling | Returning |
|---|---|
| `excel. addRow ( sheetName, startRow )` | `Excel` |
| `excel. addRow ( sheetName, startRow, n )` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `startRow` | `Number` | The row index where new rows will be added *before* it. Indexed from 0. |
| `n` | `Number` | The number of blank rows to be added. The default value is 1. |