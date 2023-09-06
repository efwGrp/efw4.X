<H1>new CSVReader</H1>

The constructor function is established to create a CSVReader object.

<h2>Sample</h2>

```javascript
//The content of the test.csv file is 
//"A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>new CSVReader (path)</td><td>CSVReader</td></tr>
<tr><td>new CSVReader (path, separator)</td><td>CSVReader</td></tr>
<tr><td>new CSVReader (path, separator, delimiter)</td><td>CSVReader</td></tr>
<tr><td>new CSVReader (path, separator, delimiter, encoding)</td><td>CSVReader</td></tr>
<tr><td>new CSVReader (path, separator, delimiter, encoding, skipRows)</td><td>CSVReader</td></tr>
<tr><td>new CSVReader (path, separator, delimiter, encoding, skipRows, rowsToRead)</td><td>CSVReader</td></tr>
<tr><td>new CSVReader (path, separator, delimiter, encoding, skipRows, rowsToRead, offsetBytes, offsetRows)</td><td>CSVReader</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative CSV file path to the storage folder.</td></tr>
<tr><td>separator</td><td>String</td><td>The separator of the CSV file. The default value is ",".</td></tr>
<tr><td>delimiter</td><td>String</td><td>The delimiter of the CSV file. The default value is "\"".</td></tr>
<tr><td>encoding</td><td>String</td><td>The charset name of the CSV file. The default value is UTF-8.</td></tr>
<tr><td>skipRows</td><td>Number</td><td>The count of rows to be skipped without reading. The default value is -1 means undefined.</td></tr>
<tr><td>rowsToRead</td><td>Number</td><td>The count of rows to be read. The default value is -1 means undefined.</td></tr>
<tr><td>offsetBytes</td><td>Number</td><td>The count of bytes to be offset before skip rows. The default value is -1 means undefined. And you can get the current position by csvReader._offsetBytes.</td></tr>
<tr><td>offsetRows</td><td>Number</td><td>The count of rows to be offset before skip rows. The default value is -1 means undefined. And you can get the current position by csvReader._offsetRows.</td></tr>
</table>
