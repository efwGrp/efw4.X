<H1>file.writeAllLines</H1>

The writeAllLines function is established to write all lines to a text file.
<h2>Sample</h2>
<pre>
	file.writeAllLines("myFolder/myFile.txt","abcdefghijklmn","UTF-8");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>file . writeAllLines ( path, content )</td><td>String</td></tr>
<tr><td>file . writeAllLines ( path, content, encoding )</td><td>String</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative text file path to the storage folder.</td></tr>
<tr><td>content</td><td>String</td><td>The text value will be saved.</td></tr>
<tr><td>encoding</td><td>String</td><td>The charset name of the text file. The default value is UTF-8;</td></tr>
</table>
