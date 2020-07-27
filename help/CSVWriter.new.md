<H1>new CSVWriter</H1>

The constructor function is established to create a CSVWriter object.

<h2>Sample</h2>
<pre>
	//The content of the test.csv file is 
	//"A,B,C,D
	// 1,2,3,4
	// a,b,c,d"
	var csvWriter = new CSVWriter("input/test.txt", ",", "\"", "MS932");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>new CSVWriter (path)</td><td>CSVWriter</td></tr>
<tr><td>new CSVWriter (path, separator)</td><td>CSVWriter</td></tr>
<tr><td>new CSVWriter (path, separator, delimiter)</td><td>CSVWriter</td></tr>
<tr><td>new CSVWriter (path, separator, delimiter, encoding)</td><td>CSVWriter</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative CSV file path to the storage folder.</td></tr>
<tr><td>separator</td><td>String</td><td>The separator of the CSV file. The default value is ",".</td></tr>
<tr><td>delimiter</td><td>String</td><td>The delimiter of the CSV file. The default value is "\"".</td></tr>
<tr><td>encoding</td><td>String</td><td>The charset name of the CSV file. The default value is UTF-8.</td></tr>
</table>
