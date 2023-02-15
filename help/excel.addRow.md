<H1>Excel.addRow</H1>

The addRow function is established to add rows in a sheet.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	excel.addRow("mySheet",0);
	excel.addRow("mySheet",1,10);
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . addRow ( sheetName , startRow)</td><td>Excel</td></tr>
<tr><td>Excel . addRow ( sheetName , startRow , n)</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>startRow</td><td>Number</td><td>The row index where new rows will be added before it. Indexed from 0. </td></tr>
<tr><td>n</td><td>Number</td><td>The blank row count to be added. The default value is 1.</td></tr>
</table>
