# Excel.setActiveSheet

The `setActiveSheet` function is used to set a sheet as the active sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet").setActiveSheet("newSheet");
```

## API

| Calling | Returning |
|---|---|
| `Excel.setActiveSheet(sheetName)` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |