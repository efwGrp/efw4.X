# new BinaryWriter

The constructor function is established to create a `BinaryWriter` object.

## Sample

```javascript
//The output of the test.txt file will be like the next
//"123456789012345678901111122222333334444499999777777777722222"
var binaryWriter = new BinaryWriter("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
```

## API

| Calling | Returning |
|---|---|
| `new BinaryWriter ( path, aryFieldsDef, aryEncoding, rowSize )` | `BinaryWriter` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative file or folder path to the storage. |
| `aryFieldsDef` | `Array` | An array that defines all field lengths. |
| `aryEncoding` | `Array` | An array that defines all field charset names. |
| `rowSize` | `Number` | The binary size of a record. |
