# efw.dialog.alert

The `alert` function is established to call a client-side alert with specified buttons. It is the base function for `Result.alert` and `Result.confirm`.

## Sample

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
## API

| Calling |
|---|
| `efw.dialog.alert(message)` |
| `efw.dialog.alert(message, buttons)` |
| `efw.dialog.alert(message, buttons, title)` |
| `efw.dialog.alert(message, buttons, title, callback)` |

| Parameter | Type | Description |
|---|---|---|
| `message` | `String` | The information to show in the alert dialog. |
| `buttons` | `Object` | To define the buttons and their click actions.<br>```{buttonName1: script1, buttonName2: script2}```<br>The script will be run on the client after the button is clicked. |
| `title` | `String` | The title for the alert dialog. |
| `callback` | `Function` | The callback function will be called after the alert dialog closes. |