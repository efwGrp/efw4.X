# Excel.hideCol

The `hideCol` function is used to hide columns in a sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.hideCol("mySheet",2,4);
```

## API

| Calling | Returning |
|---|---|
| `Excel.hideCol(sheetName, startCol, endCol)` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `startCol` | `Number` | The start column of the range to be hidden. Indexed from 0. |
| `endCol` | `Number` | The end column of the range to be hidden. Indexed from 0. |