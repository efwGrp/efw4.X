<H1>Excel.createSheet</H1>

The createSheet function is established to create a new sheet or clone an existed sheet.

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("blankSheet").createSheet("Sheet1Clone", "Sheet1");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . createSheet ( sheetName )</td><td>Excel</td></tr>
<tr><td>Excel . createSheet ( sheetName , copyFrom )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The new sheet name.</td></tr>
<tr><td>copyFrom</td><td>String</td><td>The existed sheet name.</td></tr>
</table>

