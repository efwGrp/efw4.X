<H1>TXTReader.readAllLines</H1>

The function to read all lines into a matrix of arrays.

<h2>Sample</h2>
<pre>
	//The content of the test.txt file is 
	//"12345678901234567890
	// 11111222223333344444
	// 99999777777777722222"
	var regFieldsDef="(.{5})(.{10})(.{5})";
	var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932"); 
	var array = txtReader.readAllLines();	

	//The array return value is
	//[ ["12345","6789012345","67890"]
	//  ["11111","2222233333","44444"]
	//  ["99999","7777777777","22222"] ]
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>TXTReader . readAllLines()</td><td>Array</td></tr>
</table>

