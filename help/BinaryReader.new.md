<H1>new BinaryReader</H1>

The constructor function is established to create a BinaryReader object.

<h2>Sample</h2>
<pre>
	//The content of the test.txt file is 
	//"123456789012345678901111122222333334444499999777777777722222"
	var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 10); 
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>new binaryReader (path, aryFieldsDef, aryEncoding, rowSize)</td><td>binaryReader</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative file or folder path to the storage.</td></tr>
<tr><td>aryFieldsDef</td><td>Array</td><td>An array that defines all field length.</td></tr>
<tr><td>aryEncoding</td><td>Array</td><td>An array that defines all field charset names.</td></tr>
<tr><td>rowSize</td><td>Number</td><td>The binary size of a record.</td></tr>
</table>
