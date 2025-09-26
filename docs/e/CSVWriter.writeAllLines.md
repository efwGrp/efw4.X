# CSVWriter.writeAllLines

The function to write all lines into the file.

## Sample

```javascript
//The content of the test.csv file is 
//"A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");
var ary = [
	["Z","X","C",V"],
	["Q","W","E","R"]
];
csvWriter.writeAllLines(ary);

//The content of the test.csv file becomes:
// Z,X,C,V
// Q,W,E,R"
```

## API

| Calling | Returning |
|---|---|
| `csvWriter. writeAllLines ( ary )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `ary` | `Array` | The matrix of arrays that is expected to be written. |