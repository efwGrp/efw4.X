# efw.dialog.wait

The `wait` function is established to call a countdown dialog for waiting. It is a base function for the Web Event service.

## Sample

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
## API

| Calling |
|---|
| `efw.dialog.wait(message, countdown)` |
| `efw.dialog.wait(message, countdown, title)` |
| `efw.dialog.wait(message, countdown, title, callback)` |

| Parameter | Type | Description |
|---|---|---|
| `message` | `String` | The information to show in the wait dialog. |
| `countdown` | `Number` | The number of seconds to wait. |
| `title` | `String` | The title for the wait dialog. |
| `callback` | `Function` | The callback function will be called after the wait dialog closes. |