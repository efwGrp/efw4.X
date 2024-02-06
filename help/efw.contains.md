<H1>efw.contains</H1>

The contains function is established to check whether a key has been registered into efw.
<h2>Sample</h2>

```javascript
if (!efw.contains("PDFLib")){
	load(_eventfolder+"/pdf-lib.min.js");
	load(_eventfolder+"/fontkit.umd.min.js");
	efw.register("PDFLib");
	efw.register("fontkit");
};
```
<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>efw . contains ( key )</td><td>boolean</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>key</td><td>String</td><td>The name of the global variable to be registered.</td></tr>
</table>
