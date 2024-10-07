<H1>efw.dialog.wait</H1>

The wait function is established to call a countdown dialog for waiting.
It is one base function for Web Event service.

<h2>Sample</h2>

```html
<script>
	function btnClick(){
		efw.dialog.wait("To run after 30 sec. ",30,
			"wait 30 sec",
			function(){Efw("mySeach");}
		)
	}
</script>
<input type="button" value="Send" onclick="btnClick()">
```
<h2>API</h2>

<table>
<tr><th>Calling</th></tr>
<tr><td>efw.dialog.wait ( message, countdown )</td></tr>
<tr><td>efw.dialog.wait ( message, countdown, title )</td></tr>
<tr><td>efw.dialog.wait ( message, countdown, title, callback )</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>message</td><td>String</td><td>	The information to show at the wait dialog.</td></tr>
<tr><td>countdown</td><td>Number</td><td>The seconds to wait.</td></tr>
<tr><td>title</td><td>String</td><td>The title for the wait dialog.</td></tr>
<tr><td>callback</td><td>Function</td><td>The callback function will be called after the wait dialog closing.</td></tr>
</table>
