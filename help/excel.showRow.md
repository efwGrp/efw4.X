<H1>Excel.showRow</H1>

The showRow function is established to show rows in a sheet.

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
excel.showRow("mySheet",2,4);
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . showRow ( sheetName , startRow , endRow)</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>startRow</td><td>Number</td><td>The start row of the range to be showed. Indexed from 0. </td></tr>
<tr><td>endRow</td><td>Number</td><td>The end row of the range to be showed. Indexed from 0. </td></tr>
</table>
