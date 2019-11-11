<H1>Excel.getMaxRow</H1>

The getMaxRow function is established to get the last row number starting from 1.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	var maxrow = excel.getMaxRow("Sheet1");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . getMaxRow ( sheetName )</td><td>Number</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
</table>

