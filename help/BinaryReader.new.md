# new BinaryReader

The constructor function is established to create a BinaryReader object.

## Sample

```javascript
//The content of the test.txt file is 
//"123456789012345678901111122222333334444499999777777777722222"
var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
```

## API

| Calling | Returning |
|---|---|
| `new binaryReader(path, aryFieldsDef, aryEncoding, rowSize)` | `binaryReader` |
| `new binaryReader(path, regFieldsDef, aryEncoding, rowSize, skipRows)` | `binaryReader` |
| `new binaryReader(path, regFieldsDef, aryEncoding, rowSize, skipRows, rowsToRead)` | `binaryReader` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative file or folder path to the storage. |
| `aryFieldsDef` | `Array` | An array that defines all field lengths. |
| `aryEncoding` | `Array` | An array that defines all field charset names. |
| `rowSize` | `Number` | The binary size of a record. |
| `skipRows` | `Number` | The count of rows to be skipped without reading. The default value is -1 means undefined. |
| `rowsToRead` | `Number` | The count of rows to be read. The default value is -1 means undefined. |