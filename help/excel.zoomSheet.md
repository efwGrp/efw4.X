<H1>Excel.zoomSheet</H1>

The zoomSheet function is established to zoom a sheet.

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
excel.zoomSheet("mySheet",75);
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . zoomSheet ( sheetName, percent )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>percent</td><td>Number</td><td>The percent to zoom.</td></tr>
</table>