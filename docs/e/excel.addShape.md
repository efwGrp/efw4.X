# Excel.addShape

The `addShape` function is used to create a shape by copying a shape from a template sheet and placing it to encircle a cell. This function only works with XSSF (xlsx, xlsm) files.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.addShape("newSheet","A1","templateSheet","shapeName")
.addShape("newSheet","A1","templateSheet","shapeName","text")
.addShape("newSheet","A1","templateSheet","shapeName","text",90,30)
.addShape("newSheet","A1","templateSheet","shapeName","text",90,30,40,40);	// To create a shape not including line by copying templateSheet's
```

## API

| Calling | Returning |
|---|---|
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName )` | `Excel` |
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName, text )` | `Excel` |
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName, text, x, y )` | `Excel` |
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName, text, x, y, width, height )` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `position` | `String` | The absolute reference of the cell (e.g., "A1"). |
| `templateSheetName` | `String` | The template sheet name. |
| `templateShapeName` | `String` | The name of the shape to be copied. |
| `text` | `String` | The text value for the created shape. |
| `x` | `Number` | The x-coordinate of the created shape within the cell. |
| `y` | `Number` | The y-coordinate of the created shape within the cell. |
| `width` | `Number` | The width of the created shape. |
| `height` | `Number` | The height of the created shape. |