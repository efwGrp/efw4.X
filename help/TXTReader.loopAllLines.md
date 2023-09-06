<H1>TXTReader.loopAllLines</H1>

The function to loop all lines for the callback function calling.

<h2>Sample</h2>

```javascript
//The content of the test.txt file is 
//"12345678901234567890
// 11111222223333344444
// 99999777777777722222"
var regFieldsDef="(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932"); 
txtReader.loopAllLines(callback);	// The function "callback" will be executed three times

function callback(aryField, index) {
	...
};
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>TXTReader . loopAllLines(callback)</td><td>Array</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>callback(aryField, index)</td><td>Function</td>
	<td>The function that is expected to execute line-by-line.<br>
	aryField : The array data.<br>
	index : The line number which counts from 0.
	</td></tr>
</table>
