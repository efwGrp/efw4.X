<H1>Excel.addShapeInRange</H1>

The addShapeInRange function is established to create a shape by coping to encircle cell range. Only XSSF(xlsx,xlsm).

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName","text")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName","text",20,20,40,40);	// To create a shape like line by copying templateSheet's
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . addShapeInRange ( sheetName , firstCellPosition , lastCellPosition , templateSheetName , templateShapeName)</td><td>Excel</td></tr>
<tr><td>Excel . addShapeInRange ( sheetName , firstCellPosition , lastCellPosition , templateSheetName , templateShapeName , text)</td><td>Excel</td></tr>
<tr><td>Excel . addShapeInRange ( sheetName , firstCellPosition , lastCellPosition , templateSheetName , templateShapeName , text , x1 , y1 , x2 , y2)</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>firstCellPosition</td><td>String</td><td>The absolute reference of the first cell.</td></tr>
<tr><td>lastCellPosition</td><td>String</td><td>The absolute reference of the last cell.</td></tr>
<tr><td>templateSheetName</td><td>String</td><td>The template sheet name.</td></tr>
<tr><td>templateShapeName</td><td>String</td><td>The name of the copied shape.</td></tr>
<tr><td>text</td><td>String</td><td>The created shape's text value.</td></tr>
<tr><td>x1</td><td>Number</td><td>The x coordinate within the first cell.</td></tr>
<tr><td>y1</td><td>Number</td><td>The y coordinate within the first cell.</td></tr>
<tr><td>x2</td><td>Number</td><td>The x coordinate within the last cell.</td></tr>
<tr><td>y2</td><td>Number</td><td>The y coordinate within the last cell.</td></tr>
</table>
