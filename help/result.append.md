<H1>Result.append</H1>

The append function is established to create the append attribute to the last return value.
It can be called as far as once to a runat. The second calling is invalidated without any exceptions.

<h2>Sample</h2>

```javascript
var result = new Result();
result
.runat("#table1")
.remove("tr")
.append("<tr><td>{data1}</td><td>{{data2}}</td></tr>");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Result . append ( mask )</td><td>Result</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>mask</td><td>String</td><td>The sub html with data masks which will be replaced to the removed tags.<br>

```html
<tr><td>{data1}</td><td>{{data2}}</td></tr>"
```

The "{data1}" will be replaced and htmlEncoded with the data1 as a field in withdata.
The "{{field}}" will be only replaced and be not htmlEncoded.
</td></tr>
</table>

