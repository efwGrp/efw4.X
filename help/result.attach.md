<H1>Result.attach</H1>

The attach function is established to download a file or a folder.

<h2>Sample</h2>
<pre>
	var result1 = (new Result())
	.attach("test1.xls")
	.attach("test2.xls");
	var result2 = (new Result())
	.attach("temp/test1.xls","temp")
	.attach("temp/test2.xls","temp");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Result . attach ( path )</td><td>Result</td></tr>
<tr><td>Result . attach ( path, zipBasePath )</td><td>Result</td></tr>
<tr><td>Result . attach ( path, zipBasePath, isAbs )</td><td>Result</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>File or folder path.</td></tr>
<tr><td>zipBasePath</td><td>String</td><td>The root path of the zip for downloading.</td></tr>
<tr><td>isAbs</td><td>boolean</td><td>The path is absolute path or a relative path to the storage.</td></tr>
</table>

