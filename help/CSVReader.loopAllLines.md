<H1>CSVReader.loopAllLines</H1>

The function to loop all lines for the callback function calling.

<h2>Sample</h2>

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

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>CSVReader . loopAllLines(callback)</td><td>Array</td></tr>
<tr><td>CSVReader . loopAllLines(callback , CRLFCode)</td><td>Array</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>callback(aryField, index)</td><td>Function</td>
	<td>The function that is expected to execute line-by-line.<br>
aryField : The array data.<br>
index : The line number which counts from 0.
	</td></tr>
<tr><td>CRLFCode</td><td>String</td>
	<td>To define the code for line-feed. exp. \r\n, \n</td></tr>
</table>
