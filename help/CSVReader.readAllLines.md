<H1>CSVReader.readAllLines</H1>

The function to read all lines into a matrix of arrays.

<h2>Sample</h2>
<pre>
	//The content of the test.csv file is 
	//"A,B,C,D
	// 1,2,3,4
	// a,b,c,d"
	var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
	var array = csvReader.readAllLines();	

	//The array return value is
	//["A","B","C","D"],
	//["1","2","3","4"],
	//["a","b","c","d"]
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>CSVReader . readAllLines()</td><td>Array</td></tr>
</table>

