<H1>Excel.setPrintArea</H1>

The setPrintArea function is established to set a sheet's printarea.

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
excel.setPrintArea("mySheet",0,10,0,100);
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . setPrintArea ( sheetName , startRow , endRow , startCol , endCol )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>startRow</td><td>Number</td><td>The start row of the range to be print. Indexed from 0.</td></tr>
<tr><td>endRow</td><td>Number</td><td>The end row of the range to be print. Indexed from 0.</td></tr>
<tr><td>startCol</td><td>Number</td><td>The start col of the range to be print. Indexed from 0.</td></tr>
<tr><td>endCol</td><td>Number</td><td>The end col of the range to be print. Indexed from 0.</td></tr>
</table>

