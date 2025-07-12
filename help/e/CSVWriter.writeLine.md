# CSVWriter.writeLine

The function to write an array into the file.

## Sample

```javascript
//The content of the test.csv file is 
//"1234567890,0987654321"
var ary = new Array(2);
ary[0] = ["887766","554433"];
ary[1] = ["1111","2222"];
var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");
csvWriter.writeLine(ary);	

//The content of the test.csv file becomes:
//"1234567890,0987654321
// 887766,554433
// 1111,2222"
```

## API

| Calling | Returning |
|---|---|
| `csvWriter. writeLine ( ary )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `ary` | `Array` | The array that is expected to be written. |