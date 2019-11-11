<H1>Excel.hideCol</H1>

The hideCol function is established to hide cols in a sheet.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	excel.hideCol("mySheet",2,4);
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . hideCol ( sheetName , startCol , endCol)</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>startCol</td><td>Number</td><td>The start col of the range to be hided. Indexed from 0.</td></tr>
<tr><td>endCol</td><td>Number</td><td>The end col of the range to be hided. Indexed from 0.</td></tr>
</table>
