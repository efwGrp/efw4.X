<H1>CSVReader.loopAllLines</H1>

The function to loop all lines for the callback function calling.

<h2>Sample</h2>
<pre>
	//The content of the test.csv file is 
	//"A,B,C,D
	// 1,2,3,4
	// a,b,c,d"
	var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
	csvReader.loopAllLines(callback);	// The function "callback" will be executed three times
	
	function callback(aryField, index) {
		...
	};
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>CSVReader . loopAllLines(callback)</td><td>Array</td></tr>
<tr><td>CSVReader . loopAllLines(callback , errCallback)</td><td>Array</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>callback(aryField, index)</td><td>Function</td>
	<td>The function that is expected to execute line-by-line.
	<pre>aryField : The array data.<br>index : The line number which counts from 0.</pre>
	</td></tr>
<tr><td>errCallback(strRow, index)</td><td>Function</td>
	<td>The function that is expected to execute when the row data can not be splitted to an array.
	Without errCallback, exception will be thrown when splitting error.
	<pre>strRow : The row data.<br>index : The line number which counts from 0.</pre>
	</td></tr>
</table>
