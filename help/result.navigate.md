<H1>Result.navigate</H1>

The navigate function is established to navigate to another jsp.
It can be called as far as once.

<h2>Sample</h2>

```javascript
var result = new Result();
result.navigate("the next page url");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Result . navigate ( url )</td><td>Result</td></tr>
<tr><td>Result . navigate ( url , params )</td><td>Result</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>url</td><td>String</td><td>The url which will be navigated.
</td></tr>
<tr><td>params</td><td>Object</td><td>The params which will be added after the url.

```javascript
{param1:value1, param2:value2,...}
```

</td></tr>

</table>

