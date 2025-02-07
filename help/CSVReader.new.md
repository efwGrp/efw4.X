# new CSVReader

The constructor function is established to create a `CSVReader` object.

## Sample

```javascript
//The content of the test.csv file is 
//"A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
```

## API

| Calling | Returning |
|---|---|
| `new CSVReader(path)` | `CSVReader` |
| `new CSVReader(path, separator)` | `CSVReader` |
| `new CSVReader(path, separator, delimiter)` | `CSVReader` |
| `new CSVReader(path, separator, delimiter, encoding)` | `CSVReader` |
| `new CSVReader(path, separator, delimiter, encoding, skipRows)` | `CSVReader` |
| `new CSVReader(path, separator, delimiter, encoding, skipRows, rowsToRead)` | `CSVReader` |
| `new CSVReader(path, separator, delimiter, encoding, skipRows, rowsToRead, offsetBytes, offsetRows)` | `CSVReader` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative CSV file path to the storage folder. |
| `separator` | `String` | The separator of the CSV file. The default value is `,`. |
| `delimiter` | `String` | The delimiter of the CSV file. The default value is `"`. |
| `encoding` | `String` | The charset name of the CSV file. The default value is UTF-8. |
| `skipRows` | `Number` | The count of rows to be skipped without reading. The default value is -1 (undefined). |
| `rowsToRead` | `Number` | The count of rows to be read. The default value is -1 (undefined). |
| `offsetBytes` | `Number` | The count of bytes to be offset before skipping rows. The default value is -1 (undefined). You can get the current position by `csvReader._offsetBytes`. |
| `offsetRows` | `Number` | The count of rows to be offset before skipping rows. The default value is -1 (undefined). You can get the current position by `csvReader._offsetRows`. |
