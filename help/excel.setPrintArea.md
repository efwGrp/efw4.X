# Excel.setPrintArea

The `setPrintArea` function is used to set a sheet's print area.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.setPrintArea("mySheet",0,10,0,100);
```

## API

| Calling | Returning |
|---|---|
| `excel. setPrintArea ( sheetName, startRow, endRow, startCol, endCol )` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `startRow` | `Number` | The start row of the range to be printed. Indexed from 0. |
| `endRow` | `Number` | The end row of the range to be printed. Indexed from 0. |
| `startCol` | `Number` | The start column of the range to be printed. Indexed from 0. |
| `endCol` | `Number` | The end column of the range to be printed. Indexed from 0. |
