<H1>file.get</H1>

The get function is established to get a file or folder information.

<h2>Sample</h2>
<pre>
	var infoFile = file.get("myFile.txt");
	var infoFolder = file.get("myFolder");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>file . get ( path )</td><td><a href="file.FileInfo.md">FileInfo</a></td></tr>
<tr><td>file . get ( path , withoutFolderLength )</td><td><a href="file.FileInfo.md">FileInfo</a></td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative file or folder path to the storage.</td></tr>
<tr><td>withoutFolderLength</td><td>Boolean</td><td>A flag to get folder size or not. The default value is false.</td></tr>
</table>
