<H1>Excel.addShape</H1>

The addShape function is established to create a shape by coping to encircle a cell. Only XSSF(xlsx,xlsm).

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.addShape("newSheet","A1","templateSheet","shapeName")
.addShape("newSheet","A1","templateSheet","shapeName","text")
.addShape("newSheet","A1","templateSheet","shapeName","text",90,30)
.addShape("newSheet","A1","templateSheet","shapeName","text",90,30,40,40);	// To create a shape not including line by copying templateSheet's
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . addShape ( sheetName , position , templateSheetName , templateShapeName)</td><td>Excel</td></tr>
<tr><td>Excel . addShape ( sheetName , position , templateSheetName , templateShapeName , text)</td><td>Excel</td></tr>
<tr><td>Excel . addShape ( sheetName , position , templateSheetName , templateShapeName , text, x , y)</td><td>Excel</td></tr>
<tr><td>Excel . addShape ( sheetName , position , templateSheetName , templateShapeName , text, x , y , width , height)</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>position</td><td>String</td><td>The absolute reference of the cell.</td></tr>
<tr><td>templateSheetName</td><td>String</td><td>The template sheet name.</td></tr>
<tr><td>templateShapeName</td><td>String</td><td>The name of the copied shape.</td></tr>
<tr><td>text</td><td>String</td><td>The created shape's text value.</td></tr>
<tr><td>x</td><td>Number</td><td>The x coordinate of the created shape in the cell.</td></tr>
<tr><td>y</td><td>Number</td><td>The y coordinate of the created shape in the cell.</td></tr>
<tr><td>width</td><td>Number</td><td>The created shape's width.</td></tr>
<tr><td>height</td><td>Number</td><td>The created shape's height.</td></tr>
</table>
