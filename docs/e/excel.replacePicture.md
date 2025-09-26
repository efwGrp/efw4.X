# Excel.replacePicture

The `replacePicture` function is used to replace an image shape that exists in the Excel file. This function is only available for XSSF (xlsx, xlsm) files.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.replacePicture("Sheet1","picture1","templates/tanaka.png");
```

## API

| Calling | Returning |
|---|---|
| `excel. replacePicture ( sheetName, shapeName, newPicturePath )` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `shapeName` | `String` | The name of the shape (picture) to replace. |
| `newPicturePath` | `String` | The image file path relative to the storage folder. |