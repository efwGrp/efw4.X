<H1>rest.get</H1>

The get function is established to call a restAPI with get method.
Its return is null or a JSON object.
<h2>Sample</h2>

```javascript
var ret = rest.get("http://localhost:8080/restSample/efwRestAPI/customer/u001");
// {"id":"u001","nm":"customer name"}
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>rest . get ( apiUrl  )</td><td>null or JSON</td></tr>
<tr><td>rest . get ( apiUrl , heads )</td><td>null or JSON</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>apiUrl</td><td>String</td><td>The url for the called rest api.</td></tr>
<tr><td>heads</td><td>JSON Object</td><td>The additional request heads.</td></tr>
</table>

