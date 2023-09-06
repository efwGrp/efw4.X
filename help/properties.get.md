<H1>properties.get</H1>

The get function is established to get data from the efw.properties file.

<h2>Sample</h2>

```javascript
var bln = properties.get("efw.login.check", false);
var str = properties.get("efw.login.key");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>properties . get ( key )</td><td>String</td></tr>
<tr><td>properties . get ( key , defaultValue )</td><td>{any} *The type of defaultValue</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>key</td><td>String</td><td>To idetify the property info.</td></tr>
<tr><td>defaultValue</td><td>{any}</td><td>The default value if no property is defined in the efw.properties file.</td></tr>
</table>

