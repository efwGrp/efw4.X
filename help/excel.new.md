# new Excel

The constructor function is used to open an existing Excel file. Even if you want to create a new Excel file, you must create it from a template file.

## Sample

```javascript
var excelHSSF = new Excel("small.xls");
var excelXSSF = new Excel("small.xlsx");
var excelSXSSF = new Excel("large.xlsx" , true);
```

## API

| Calling | Returning |
|---|---|
| `new Excel ( path )` | `Excel` |
| `new Excel ( path, isLarge )` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The Excel file path relative to the storage folder. |
| `isLarge` | `Boolean` | If the value is `true`, the Excel file can be operated with very large data. Please pay attention to the details about [SXSSF](http://poi.apache.org/components/spreadsheet/how-to.html#sxssf). |