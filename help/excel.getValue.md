<H1>Excel.getValue</H1>

The getValue function is established to get the value from a cell.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	var v1 = excel.getValue("Sheet1", "A1");
	var v2 = excel.getValue("Sheet1", "B2", "yyyy/MM/dd");
	var v3 = excel.getValue("Sheet1", "C3", "#,##0.0", "HALF_EVEN");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . getValue ( sheetName , position )</td><td>String | Number | Date | Boolean</td></tr>
<tr><td>Excel . getValue ( sheetName , position , formatter )</td><td>String | Number | Date | Boolean</td></tr>
<tr><td>Excel . getValue ( sheetName , position , formatter , rounder )</td><td>String | Number | Date | Boolean</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>position</td><td>String</td><td>The absolute reference of the cell.</td></tr>
<tr><td><a href="formatter&rounder.md">formatter</a></td><td>String</td><td>Number formatter or date formatter.</td></tr>
<tr><td><a href="formatter&rounder.md">rounder</a></td><td>String</td><td>The rounder for number format.</td></tr>
</table>

