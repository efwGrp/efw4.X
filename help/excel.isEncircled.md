<H1>Excel.isEncircled</H1>

The isEncircled function is established to judge whether a point is encircled by a shape or not. Only XSSF(xlsx,xlsm).

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
var tf1 = excel.isEncircled("Sheet1", "A1");
var tf2 = excel.isEncircled("Sheet1", "B2", 0.25, 0.5);
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . isEncircled ( sheetName , position )</td><td>Boolean</td></tr>
<tr><td>Excel . isEncircled ( sheetName , position , checkpointXRate ,checkpointYRate )</td><td>Boolean</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>position</td><td>String</td><td>The absolute reference of the cell.</td></tr>
<tr><td>checkpointXRate</td><td>Number</td><td>The The rate of the x coordinate of the shape center point to the cell width.
The default is 0.5 .</td></tr>
<tr><td>checkpointYRate</td><td>Number</td><td>The The rate of the y coordinate of the shape center point to the cell height.
The default is 0.5 .</td></tr>
</table>

