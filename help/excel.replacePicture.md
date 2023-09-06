<H1>Excel.replacePicture</H1>

The replacePicture function is established to replace an image shape that exists on the excel. Only XSSF(xlsx,xlsm).

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
excel.replacePicture("Sheet1","picture1","templates/tanaka.png");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . addShapeInRange ( sheetName , shapeName , newPicturePath )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The template sheet name.</td></tr>
<tr><td>shapeName</td><td>String</td><td>The name of the copied shape.</td></tr>
<tr><td>newPicturePath</td><td>String</td><td>The image file path relatived to the storage folder.</td></tr>
</table>
