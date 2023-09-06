<H1>Excel.save</H1>

The save function is established to save the excel object to a file.

<h2>Sample</h2>

```javascript
var excel = new Excel("test.xlsx");
excel.save("my.xlsx");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . save ( path )</td><td>Excel</td></tr>
<tr><td>Excel . save ( path , password )</td><td>Excel</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The excel file path relatived to the storage folder.</td></tr>
<tr><td>password</td><td>String</td><td>The password for openning.</td></tr>
</table>

