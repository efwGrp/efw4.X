# Excel.isEncircled

The `isEncircled` function is used to determine whether a point is encircled by a shape. This function is only available for XSSF (xlsx, xlsm) files.

## Sample

```javascript
var excel = new Excel("test.xlsx");
var tf1 = excel.isEncircled("Sheet1", "A1");
var tf2 = excel.isEncircled("Sheet1", "B2", 0.25, 0.5);
```
## API

| Calling | Returning |
|---|---|
| `excel. isEncircled ( sheetName, position )` | `Boolean` |
| `excel. isEncircled ( sheetName, position, checkpointXRate, checkpointYRate )` | `Boolean` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `position` | `String` | The absolute reference of the cell. |
| `checkpointXRate` | `Number` | The rate of the x coordinate of the shape's center point to the cell width. The default is 0.5. |
| `checkpointYRate` | `Number` | The rate of the y coordinate of the shape's center point to the cell height. The default is 0.5. |