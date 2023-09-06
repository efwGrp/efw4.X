<H1>event.fire</H1>

The fire function is established to execute a application event.
Its return is an instance of the <a href="result.md">Result</a> class.

<h2>Sample</h2>

```javascript
var data = {
	"#txtUser" : "Wang"
};
return (new Result()).runat("body").withdata({
	"#txtUser" : "Wang"
}).alert("hello world!").concat(event.fire("subEvent", data));
```

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>event . fire( eventId , params )</td><td><a href="result.md">Result</a></td></tr>
<tr><td>event . fire( eventId , params , server)</td><td><a href="result.md">Result</a></td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>eventId</td><td>String</td><td>The event file name.</td></tr>
<tr><td>params</td><td>JSON Object</td>
<td>To send values to the event. 

```javascript
{"param1":value1,"param2":value2,...}
```

</td></tr>
<tr><td>server</td><td>String</td>
<td>To call the event from a remote server. 

```javascript
http://remoteserver/efwapp
```

</td></tr>
</table>