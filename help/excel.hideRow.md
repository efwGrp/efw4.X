<H1>Excel.hideRow</H1>

The hideRow function is established to hide rows in a sheet.

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
excel.hideRow("mySheet",2,4);
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . hideRow ( sheetName , startRow , endRow)</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>startRow</td><td>Number</td><td>The start row of the range to be hided. Indexed from 0.</td></tr>
<tr><td>endRow</td><td>Number</td><td>The end row of the range to be hided. Indexed from 0.</td></tr>
</table>
