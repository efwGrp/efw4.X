# Excel.createSheet

The `createSheet` function is used to create a new sheet or clone an existing sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("blankSheet").createSheet("Sheet1Clone", "Sheet1");
```
## API

| Calling | Returning |
|---|---|
| `excel. createSheet ( sheetName )` | `Excel` |
| `excel. createSheet ( sheetName, copyFrom )` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The name of the new sheet. |
| `copyFrom` | `String` | The name of an existing sheet to clone. |
