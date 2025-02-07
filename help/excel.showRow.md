# Excel.showRow

The `showRow` function is used to show rows in a sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.showRow("mySheet",2,4);
```

## API

| Calling | Returning |
|---|---|
| `Excel.showRow(sheetName, startRow, endRow)` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `startRow` | `Number` | The start row of the range to be shown. Indexed from 0. |
| `endRow` | `Number` | The end row of the range to be shown. Indexed from 0. |