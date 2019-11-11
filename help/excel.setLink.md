<H1>Excel.setLink</H1>

The setLink function is established to set a link into a cell.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	excel.createSheet("newSheet")
	.createSheet("linkSheet")
	.setLink("newSheet","A1","#\'linkSheet'!A1");		// To set a link into a cell.
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . setCell ( sheetName , position , linkUrl )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>position</td><td>String</td><td>The cell position for add a link.</td></tr>
<tr><td>linkUrl</td><td>String</td><td>The Url for link to a sheet.</td></tr>
</table>
