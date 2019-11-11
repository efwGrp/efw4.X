<H1>new TXTReader</H1>

The constructor function is established to create a TXTReader object for event returning.

<h2>Sample</h2>
<pre>
	//The content of the test.txt file is "12345678901234567890"
	var regFieldsDef="(.{5})(.{10})(.{5})";
	var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932"); 
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>new TXTReader (path, regFieldsDef)</td><td>TXTReader</td></tr>
<tr><td>new TXTReader (path, regFieldsDef, encoding)</td><td>TXTReader</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative file or folder path to the storage.</td></tr>
<tr><td>regFieldsDef</td><td>String</td><td>A regular expression that defines the fields to be fetched.</td></tr>
<tr><td>encoding</td><td>String</td><td>The charset name of the text file. The default value is UTF-8.</td></tr>
</table>
