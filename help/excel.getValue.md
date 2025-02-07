# Excel.getValue

The `getValue` function is used to retrieve the value from a cell.

## Sample

```javascript
var excel = new Excel("test.xlsx");
var v1 = excel.getValue("Sheet1", "A1");
var v2 = excel.getValue("Sheet1", "B2", "yyyy/MM/dd");
var v3 = excel.getValue("Sheet1", "C3", "#,##0.0", "HALF_EVEN");
```

## API

| Calling | Returning |
|---|---|
| `Excel.getValue(sheetName, position)` | `String` \| `Number` \| `Date` \| `Boolean` |
| `Excel.getValue(sheetName, position, formatter)` | `String` \| `Number` \| `Date` \| `Boolean` |
| `Excel.getValue(sheetName, position, formatter, rounder)` | `String` \| `Number` \| `Date` \| `Boolean` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `position` | `String` | The absolute reference of the cell. |
| [formatter](formatter&rounder.md) | `String` | Number formatter or date formatter. |
| [rounder](formatter&rounder.md) | `String` | The rounder for number format. |
