<H1>Result.saveas</H1>

The saveas function is established to rename the download file.

<h2>Sample</h2>
<pre>
	var result = new Result();
	result.attach("test.xls")
		.saveas("hello.xls");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Result . saveas ( filename )</td><td>Result</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>filename</td><td>String</td><td>The file name for saving.</td></tr>
</table>

