<H1>Excel.setSheetOrder</H1>

The setSheetOrder function is established to move a sheet's position.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	excel.createSheet("newSheet").setSheetOrder("newSheet", 1);
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . setSheetOrder ( sheetName , order )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>order</td><td>Number</td><td>The position of the sheet.Starting from 1.</td></tr>
</table>

