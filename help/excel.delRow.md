<H1>Excel.delRow</H1>

The delRow function is established to delete rows in a sheet.

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
excel.delRow("mySheet,0);
excel.delRow("mySheet,1,10);
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . delRow ( sheetName , startRow)</td><td>Excel</td></tr>
<tr><td>Excel . delRow ( sheetName , startRow , n)</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>startRow</td><td>Number</td><td>The row index where rows will be deleted from it. Indexed from 0. </td></tr>
<tr><td>n</td><td>Number</td><td>The row count to be deleted. The default value is 1.</td></tr>
</table>
