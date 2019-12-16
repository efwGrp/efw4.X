<H1>file.readAllLines</H1>

The readAllLines function is established to read all lines from a text file.
<h2>Sample</h2>
<pre>
	var txt=file.readAllLines("myFolder/myFile.txt");
	var txt=file.readAllLines("myFolder/myFile.txt", "UTF-8");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>file . readAllLines ( path )</td><td>String</td></tr>
<tr><td>file . readAllLines ( path, encoding )</td><td>String</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative text file path to the storage folder.</td></tr>
<tr><td>encoding</td><td>String</td><td>The charset name of the text file. The default value is UTF-8;</td></tr>
</table>
