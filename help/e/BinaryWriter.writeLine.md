# BinaryWriter.writeLine

The function to write an array into the file.

## Sample

```javascript
//The content of the test.txt file is 
//"12345678901234567890"
var ary = new Array(2);
ary[0] = ["a","b","c"];
ary[1] = ["d","e","f"];
var binaryWriter = new BinaryWriter("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
binaryWriter.writeLine(ary);	

//The content of the test.txt file becomes:
//"12345678901234567890a    b         c    d    e         f    "
```

## API

| Calling | Returning |
|---|---|
| `binaryWriter. writeLine ( ary )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `ary` | `Array` | The array that is expected to be written. |