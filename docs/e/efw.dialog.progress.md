# efw.dialog.progress

The `progress` function is established to call a progress dialog. 
It is a base function for the Result.progress method.

## Sample

```html
<script>
	function btnClick(){
		efw.dialog.progress("hello world ! ",20);
	}
</script>
<input type="button" value="preview" onclick="btnClick()">
```
## API

| Calling |
|---|
| `efw. dialog. progress ( message, percent )` |
| `efw. dialog. progress ( message, percent, closeFlag )` |

| Parameter | Type | Description |
|---|---|---|
| `message` | `String` | The information to show in the progress dialog. |
| `percent` | `Number` | The value for the progress bar in the dialog. |
| `closeFlag` | `Boolean` | `true` to close the proress dialog. |
