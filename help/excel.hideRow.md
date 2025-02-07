# Excel.hideRow

The `hideRow` function is used to hide rows in a sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.hideRow("mySheet",2,4);
```

## API

| Calling | Returning |
|---|---|
| `Excel.hideRow(sheetName, startRow, endRow)` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `startRow` | `Number` | The start row of the range to be hidden. Indexed from 0. |
| `endRow` | `Number` | The end row of the range to be hidden. Indexed from 0. |
