# Excel.save

The `save` function is used to save the Excel object to a file.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.save("my.xlsx");
```

## API

| Calling | Returning |
|---|---|
| `excel. save ( path )` | `Excel` |
| `excel. save ( path, password )` | `Excel` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The Excel file path relative to the storage folder. |
| `password` | `String` | The password for opening the file. |