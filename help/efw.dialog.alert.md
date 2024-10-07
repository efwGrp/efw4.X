<H1>efw.dialog.alert</H1>

The alert function is established to call client alert with specified buttons.
It is the base function for Result.alert and Result.confirm.

<h2>Sample</h2>

```html
<script>
	function btnClick(){
		efw.dialog.alert("To save the input. OK ? ",{
				OK:function(){Efw("myPage_save");},
				Close:null,
			},
			"Save or Not",
		)
	}
</script>
<input type="button" value="Send" onclick="btnClick()">
```
<h2>API</h2>

<table>
<tr><th>Calling</th></tr>
<tr><td>efw.dialog.alert ( message )</td></tr>
<tr><td>efw.dialog.alert ( message, buttons )</td></tr>
<tr><td>efw.dialog.alert ( message, buttons, title )</td></tr>
<tr><td>efw.dialog.alert ( message, buttons, title, callback )</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>message</td><td>String</td><td>	The information to show at the alert dialog.</td></tr>
<tr><td>buttons</td><td>Object</td><td>To define the buttons and the click actions.

```javascript
{buttonName1:script1, buttonName2:script2}
```

The script will be run at client after the button is clicked.
</td></tr>
<tr><td>title</td><td>String</td><td>The title for the alert dialog.</td></tr>
<tr><td>callback</td><td>Function</td><td>The callback function will be called after the alert dialog closing.</td></tr>
</table>
