<H1>new TXTReader</H1>

The constructor function is established to create a TXTReader object.

<h2>Sample</h2>

```javascript
//The content of the test.txt file is 
//"12345678901234567890
// 11111222223333344444
// 99999777777777722222"
var regFieldsDef="(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932"); 

//The content of the test.txt file is 
//"123456789012345678901111122222333334444499999777777777722222"
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932", 20); 
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>new TXTReader (path, regFieldsDef)</td><td>TXTReader</td></tr>
<tr><td>new TXTReader (path, regFieldsDef, encoding)</td><td>TXTReader</td></tr>
<tr><td>new TXTReader (path, regFieldsDef, encoding, rowSize)</td><td>TXTReader</td></tr>
<tr><td>new TXTReader (path, regFieldsDef, encoding, rowSize, skipRows)</td><td>TXTReader</td></tr>
<tr><td>new TXTReader (path, regFieldsDef, encoding, rowSize, skipRows, rowsToRead)</td><td>TXTReader</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative file or folder path to the storage.</td></tr>
<tr><td>regFieldsDef</td><td>String</td><td>A regular expression that defines the fields to be fetched.</td></tr>
<tr><td>encoding</td><td>String</td><td>The charset name of the text file. The default value is UTF-8.</td></tr>
<tr><td>rowSize</td><td>Number</td><td>The binary size of a record. The default value is -1 means undefined.</td></tr>
<tr><td>skipRows</td><td>Number</td><td>The count of rows to be skipped without reading. The default value is -1 means undefined.</td></tr>
<tr><td>rowsToRead</td><td>Number</td><td>The count of rows to be read. The default value is -1 means undefined.</td></tr>
</table>
