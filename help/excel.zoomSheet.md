# Excel.zoomSheet

The `zoomSheet` function is used to zoom a sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.zoomSheet("mySheet",75);
```

## API

| Calling | Returning |
|---|---|
| `excel. zoomSheet ( sheetName, percent )` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `percent` | `Number` | The percentage to zoom. |