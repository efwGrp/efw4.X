# Excel.showCol

The `showCol` function is used to show columns in a sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.showCol("mySheet",2,4);
```
## API

| Calling | Returning |
|---|---|
| `excel. showCol ( sheetName, startCol, endCol )` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `startCol` | `Number` | The start column of the range to be shown. Indexed from 0. |
| `endCol` | `Number` | The end column of the range to be shown. Indexed from 0. |