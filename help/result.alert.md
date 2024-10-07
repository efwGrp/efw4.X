<H1>Result.alert</H1>

The alert function is established to show a alert dialog.
But if with another alert, the alert messages will be connected.

<h2>Sample</h2>

```javascript
var result = new Result();
result.alert("good morning!").alert("good night!");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Result . alert ( message )</td><td>Result</td></tr>
<tr><td>Result . alert ( message , title )</td><td>Result</td></tr>
<tr><td>Result . alert ( message , params )</td><td>Result</td></tr>
<tr><td>Result . alert ( message , title , params )</td><td>Result</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>message</td><td>String</td><td>The information to show at the alert dialog.

```javascript
xxxx{param1}yyy{param2}yy
```

You can define "{param}" in the message, it will be replaced by the params.
</td></tr>
<tr><td>params</td><td>Object</td><td>The params to replace "{param}" in the message.

```javascript
{
	param1:value1,
	param2:value2
}
```

</td></tr>
<tr><td>title</td><td>function</td><td>The function to run afeter alert dialog.</td></tr>

</table>

