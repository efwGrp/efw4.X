# Excel.encircle

The `encircle` function is used to create a shape by copying and encircling a cell.  It is only available for XSSF (xlsx, xlsm) files.

## Sample

```javascript
// To run the sample, be sure to put a shape named "shape1" in Sheet1.

var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
// To encircle the cell A1 by copying shape1. The new shape is default center with 50% width and 50% height of the cell A1.
.encircle("newSheet", "A1", "Sheet1", "shape1")
// To encircle the cell B1 by copying shape1. The new shape is top/center with 50% width and 50% height of the cell B1.
.encircle("newSheet", "B1", "Sheet1", "shape1", 0.25, 0.5 )				
// To encircle the cell C1 by copying shape1. The new shape is center with 50% width and 25% height of the cell C1.
.encircle("newSheet", "C1", "Sheet1", "shape1", 0.5, 0.5, 0.5, 0.25 );
```

## API

| Calling | Returning |
|---|---|
| `Excel.encircle(sheetName, position, templateSheetName, templateShapeName)` | `Excel` |
| `Excel.encircle(sheetName, position, templateSheetName, templateShapeName, shapeCenterXRate, shapeCenterYRate)` | `Excel` |
| `Excel.encircle(sheetName, position, templateSheetName, templateShapeName, shapeCenterXRate, shapeCenterYRate, shapeWidthRate, shapeHeightRate)` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `position` | `String` | The absolute reference of the cell. |
| `templateSheetName` | `String` | The template sheet name. |
| `templateShapeName` | `String` | The template shape name in the template sheet. |
| `shapeCenterXRate` | `Number` | The rate of the x coordinate of the shape center point to the cell width. The default is 0.5. |
| `shapeCenterYRate` | `Number` | The rate of the y coordinate of the shape center point to the cell height. The default is 0.5. |
| `shapeWidthRate` | `Number` | The rate of the shape width to the cell width. The default is 0.5. |
| `shapeHeightRate` | `Number` | The rate of the shape height to the cell height. The default is 0.5. |