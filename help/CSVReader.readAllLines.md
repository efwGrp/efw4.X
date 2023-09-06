<H1>CSVReader.readAllLines</H1>

The function to read all lines into a matrix of arrays.

<h2>Sample</h2>

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

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>CSVReader . readAllLines()</td><td>Array</td></tr>
<tr><td>CSVReader . readAllLines(CRLFCode)</td><td>Array</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>CRLFCode</td><td>String</td>
	<td>To define the code for line-feed. exp. \r\n, \n</td></tr>
</table>
