<H1>CSVWriter.writeLine</H1>

The function to write an array into the file.

<h2>Sample</h2>

```javascript
//The content of the test.csv file is 
//"1234567890,0987654321"
var ary = new Array(2);
ary[0] = "887766,554433";
ary[1] = "1111,2222";
var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");
csvWriter.writeLine(ary);	

//The content becomes of the test.csv file is 
//"1234567890,0987654321
// 887766,554433
// 1111,2222"
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>CSVWriter . writeLine(ary)</td><td>void</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>ary</td><td>Array</td><td>The arrays that is expected to be write.</td></tr>
</table>
