<H1>Excel.setActiveSheet</H1>

The setActiveSheet function is established a sheet to be active.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	excel.createSheet("newSheet").setActiveSheet("newSheet");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . setActiveSheet ( sheetName )</td><td>Excel</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
</table>
