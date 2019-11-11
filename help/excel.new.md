<H1>new Excel</H1>

The constructor function is established to open an existed excel file.
Even you want to create new excel file, you must create it from a template file.

<h2>Sample</h2>
<pre>
	var excelHSSF = new Excel("small.xls");
	var excelXSSF = new Excel("small.xlsx");
	var excelSXSSF = new Excel("large.xlsx" , true);
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>new Excel ( path )</td><td>Excel</td></tr>
<tr><td>new Excel ( path , isLarge )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The excel file path relatived to the storage folder.</td></tr>
<tr><td>isLarge</td><td>Boolean</td><td>If the value is true, the excel file can be operated with very large data. Please pay attention to the details about <a href="http://poi.apache.org/components/spreadsheet/how-to.html#sxssf">SXSSF</a>.</td></tr>
</table>

