<H1>loadWithGlobalPool</H1>

The loadWithGlobalPool function is established to load and evaluate script from a script object with a pool to store the script context.
<h2>Sample</h2>

```javascript
var runscript=`
	var pdfDataUri;
	for(var i=0;i<10;i++){
		var pdfDoc=await(PDFLib.PDFDocument.create());
		var page = pdfDoc.addPage([350, 400]);
		page.moveTo(110, 200);
		page.drawText(msg);
		pdfDataUri=await(pdfDoc.saveAsBase64({ dataUri: true }));
	}
	pdfDataUri;
`;
var pdfDataUri=loadWithGlobalPool({
	name:"pdf-lib",
	max:3,
	initializer:"load(_eventfolder+'/pdf-lib.min.js');",
	script:runscript,
	context:{msg:"Hello World!"},
	engine:"nashorn",
	returnVar:"pdfDataUri"
});
return new Result().eval("$('"+params.pdf+"')[0].src='" +pdfDataUri +"'");
```
<h2>API</h2>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>name</td><td>String</td><td>The name of the pool.</td></tr>
<tr><td>max</td><td>Number</td><td>The max size of the pool.</td></tr>
<tr><td>initializer</td><td>String</td><td>Script string executed by the pool when initializing the script context.</td></tr>
<tr><td>script</td><td>String</td><td>Script string executed by the pool on call.</td></tr>
<tr><td>context</td><td>Object</td><td>The attributes of the context parameter will be set into the global of the script context.</td></tr>
<tr><td>engine</td><td>String</td><td>The name of the engines in the pool.Only "nashorn" or "javet".</td></tr>
<tr><td>returnVar</td><td>String</td><td>The var name to get the return value.</td></tr>
</table>
