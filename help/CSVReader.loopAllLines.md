# CSVReader.loopAllLines

The function to loop all lines for the callback function calling.

## Sample

```javascript
//The content of the test.csv file is 
//"A,B,C,D\r\n
// 1,2,3,4\r\n
// a,b,c,d\r\n"
var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
csvReader.loopAllLines(callback,"\r\n");	// The function "callback" will be executed three times

function callback(aryField, index) {
	...
};
```

## API

| Calling | Returning |
|---|---|
| `CSVReader.loopAllLines(callback)` | `Array` |
| `CSVReader.loopAllLines(callback, CRLFCode)` | `Array` |

| Parameters | Type | Description |
|---|---|---|
| `callback(aryField, index)` | `Function` | The function that is expected to execute line-by-line.<br>`aryField`: The array data.<br>`index`: The line number which counts from 0. |
| `CRLFCode` | `String` | To define the code for line-feed. exp. `\r\n`, `\n` |

