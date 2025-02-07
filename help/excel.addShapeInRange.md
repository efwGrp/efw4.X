# Excel.addShapeInRange

The `addShapeInRange` function is used to create a shape by copying a shape from a template sheet and placing it to encircle a cell range. This function only works with XSSF (xlsx, xlsm) files.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName","text")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName","text",20,20,40,40);	// To create a shape like line by copying templateSheet's
```

## API

| Calling | Returning |
|---|---|
| `Excel.addShapeInRange(sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName)` | `Excel` |
| `Excel.addShapeInRange(sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName, text)` | `Excel` |
| `Excel.addShapeInRange(sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName, text, x1, y1, x2, y2)` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `firstCellPosition` | `String` | The absolute reference of the first cell (e.g., "A1"). |
| `lastCellPosition` | `String` | The absolute reference of the last cell (e.g., "B2"). |
| `templateSheetName` | `String` | The template sheet name. |
| `templateShapeName` | `String` | The name of the shape to be copied. |
| `text` | `String` | The text value for the created shape. |
| `x1` | `Number` | The x-coordinate within the first cell. |
| `y1` | `Number` | The y-coordinate within the first cell. |
| `x2` | `Number` | The x-coordinate within the last cell. |
| `y2` | `Number` | The y-coordinate within the last cell. |