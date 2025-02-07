# Excel.setCell

The `setCell` function is used to set a value, styles, etc., into a cell.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.setCell("newSheet", "A1", "hell world!")					// To set a value into a cell.
.setCell("newSheet", "B1", "hell world!", "Sheet1", "A1")	// To set a value into a cell and to copy styles from another cell.
.setCell("newSheet", "C1", null, "Sheet1", "A2");			// If value is null, it will try to set the formula.
```

## API

| Calling | Returning |
|---|---|
| `Excel.setCell(sheetName, position, value)` | `Excel` |
| `Excel.setCell(sheetName, position, value, templateSheetName, templatePosition)` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `position` | `String` | The absolute reference of the cell. |
| `value` | `String` \| `Number` \| `Date` \| `Boolean` \| `null` | The value for setting into a cell. If it is `null`, it will try to set the formula. |
| `templateSheetName` | `String` | The template sheet name. |
| `templatePosition` | `String` | The absolute reference of the template cell. |
