# new TXTReader

The constructor function creates a `TXTReader` object.

## Sample

```javascript
// The content of the test.txt file is:
// 12345678901234567890
// 11111222223333344444
// 99999777777777722222

var regFieldsDef = "(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932");

// The content of the test.txt file is:
// 123456789012345678901111122222333334444499999777777777722222

var txtReader2 = new TXTReader("input/test.txt", regFieldsDef, "MS932", 20);
```

## API

| Calling | Returning |
|---|---|
| `new TXTReader ( path, regFieldsDef )` | `TXTReader` |
| `new TXTReader ( path, regFieldsDef, encoding )` | `TXTReader` |
| `new TXTReader ( path, regFieldsDef, encoding, rowSize )` | `TXTReader` |
| `new TXTReader ( path, regFieldsDef, encoding, rowSize, skipRows )` | `TXTReader` |
| `new TXTReader ( path, regFieldsDef, encoding, rowSize, skipRows, rowsToRead )` | `TXTReader` |

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `path` | `String` | The relative path to the file or folder. |
| `regFieldsDef` | `String` | A regular expression defining the fields to extract. |
| `encoding` | `String` | The character set encoding of the text file. The default is UTF-8. |
| `rowSize` | `Number` | The size of a record in bytes. The default is -1 (undefined). |
| `skipRows` | `Number` | The number of rows to skip before reading. The default is -1 (undefined). |
| `rowsToRead` | `Number` | The number of rows to read. The default is -1 (undefined). |