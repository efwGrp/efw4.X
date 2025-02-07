# BinaryReader.loopAllLines

The function to loop all lines for the callback function calling.

## Sample

```javascript
//The content of the test.txt file is 
//"123456789012345678901111122222333334444499999777777777722222"
var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20); 
binaryReader.loopAllLines(callback);	// The function "callback" will be executed three times

function callback(aryField, index) {
	...
};
```

## API

| Calling | Returning |
|---|---|
| `BinaryReader.loopAllLines(callback)` | `Array` |

| Parameters | Type | Description |
|---|---|---|
| `callback(aryField, index)` | `Function` | The function that is expected to execute line-by-line.<br> `aryField`: The array data.<br> `index`: The line number which counts from 0. |