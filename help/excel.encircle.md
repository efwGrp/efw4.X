<H1>Excel.encircle</H1>

The encircle function is established to create a shape by coping to encircle a cell. Only XSSF(xlsx,xlsm).

<h2>Sample</h2>

```javascript
//To run the sample, be sure to put a shape named "shape1" in Sheet1.

var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
// To encircle the cell A1 by coping shape1. The new shape is default center with 50% width and 50% height of the cell A1.
.encircle("newSheet", "A1", "Sheet1", "shape1")
// To encircle the cell B1 by coping shape1. The new shape is top/center with 50% width and 50% height of the cell B1.
.encircle("newSheet", "B1", "Sheet1", "shape1", 0.25, 0.5 )				
// To encircle the cell C1 by coping shape1. The new shape is center with 50% width and 25% height of the cell C1.
.encircle("newSheet", "C1", "Sheet1", "shape1", 0.5, 0.5, 0.5, 0.25 );	
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . encircle ( sheetName , position , templateSheetName , templateShapeName )</td><td>Excel</td></tr>
<tr><td>Excel . encircle ( sheetName , position , templateSheetName , templateShapeName , shapeCenterXRate , shapeCenterYRate )</td><td>Excel</td></tr>
<tr><td>Excel . encircle ( sheetName , position , templateSheetName , templateShapeName , shapeCenterXRate , shapeCenterYRate , shapeWidthRate , shapeHeightRate )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>position</td><td>String</td><td>The absolute reference of the cell.</td></tr>
<tr><td>templateSheetName</td><td>String</td><td>The template sheet name.</td></tr>
<tr><td>templateShapeName</td><td>String</td><td>The template shape name in the template sheet.</td></tr>

<tr><td>shapeCenterXRate</td><td>Number</td><td>The The rate of the x coordinate of the shape center point to the cell width.
The default is 0.5 .</td></tr>
<tr><td>shapeCenterYRate</td><td>Number</td><td>The The rate of the y coordinate of the shape center point to the cell height.
The default is 0.5 .</td></tr>
<tr><td>shapeWidthRate</td><td>Number</td><td>The The rate of the shape width to the cell width.
The default is 0.5 .</td></tr>
<tr><td>shapeHeightRate</td><td>Number</td><td>The The rate of the shape height to the cell height.
The default is 0.5 .</td></tr>

</table>

