# BinaryWriter.writeAllLines

The function to write all lines into the file.

## Sample

```javascript
//The content of the test.txt file is 
//"12345678901234567890"
var binaryWriter = new BinaryWriter("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
var ary = new Array(2);
ary[0] = ["a","b","c"];
ary[1] = ["d","e","f"];
binaryWriter.writeAllLines(ary);

//The content of the test.txt file becomes:
//"a    b         c    d    e         f    "
```

## API

| Calling | Returning |
|---|---|
| `binaryWriter. writeAllLines ( ary )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `ary` | `Array` | The matrix of arrays that is expected to be written. |