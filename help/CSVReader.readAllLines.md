# CSVReader.readAllLines

The function to read all lines into a matrix of arrays.

## Sample

```javascript
//The content of the test.csv file is 
//"A,B,C,D\r\n
// 1,2,3,4\r\n
// a,b,c,d\r\n"
var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
var array = csvReader.readAllLines("\r\n");	

//The array return value is
//["A","B","C","D"],
//["1","2","3","4"],
//["a","b","c","d"]
```

## API

| Calling | Returning |
|---|---|
| `CSVReader.readAllLines()` | `Array` |
| `CSVReader.readAllLines(CRLFCode)` | `Array` |

| Parameters | Type | Description |
|---|---|---|
| `CRLFCode` | `String` | To define the code for line-feed. exp. `\r\n`, `\n` |