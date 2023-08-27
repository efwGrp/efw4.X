<H1>efw.register</H1>

The register function is established to register a key into efw 
to prevent the system from recognizing it as an illegal global variable.
<h2>Sample</h2>
```javascript
load(_eventfolder+"/pdf-lib.min.js");
load(_eventfolder+"/fontkit.umd.min.js");
efw.register("PDFLib");
efw.register("fontkit");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>efw . register ( key )</td><td>void</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>key</td><td>Array</td><td>The name of the global variable to be registered.</td></tr>
</table>
