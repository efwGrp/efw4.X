# new CSVWriter

The constructor function is established to create a `CSVWriter` object.

## Sample

```javascript
//The content of the test.csv file is 
//"A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvWriter = new CSVWriter("input/test.txt", ",", "\"", "MS932");
```

## API

| Calling | Returning |
|---|---|
| `new CSVWriter ( path )` | `CSVWriter` |
| `new CSVWriter ( path, separator )` | `CSVWriter` |
| `new CSVWriter ( path, separator, delimiter )` | `CSVWriter` |
| `new CSVWriter ( path, separator, delimiter, encoding )` | `CSVWriter` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative CSV file path to the storage folder. |
| `separator` | `String` | The separator of the CSV file. The default value is `,`. |
| `delimiter` | `String` | The delimiter of the CSV file. The default value is `"`. |
| `encoding` | `String` | The charset name of the CSV file. The default value is UTF-8. |