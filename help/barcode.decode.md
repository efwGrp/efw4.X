<H1>barcode.decode</H1>

The decode function is established to decode a barcode image file to get the value.
If it is not decodable, the return will be null.
<h2>Sample</h2>

```javascript
var msg = barcode.decode("test.png");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>barcode . decode ( imagePath )</td><td>{String | null}</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>imagePath</td><td>String</td><td>The barcode image file path relatived to the storage folder.</td></tr>
</table>