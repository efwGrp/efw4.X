<H1>CSVWriter.writeAllLines</H1>

The function to write all lines into the file.

<h2>Sample</h2>

```javascript
//The content of the test.csv file is 
//"A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");
var ary = [
	["Z,X,C,V"],
	["Q,W,E,R"]
];
csvWriter.writeAllLines(ary);

//The content becomes of the test.csv file is 
//"A,B,C,D
// 1,2,3,4
// a,b,c,d
// Z,X,C,V
// Q,W,E,R"
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>CSVWriter.writeAllLines(ary)</td><td>void</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>ary</td><td>Array</td><td>The matrix of arrays that is expected to be write.</td></tr>
</table>
