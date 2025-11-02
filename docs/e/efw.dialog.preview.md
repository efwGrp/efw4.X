# efw.dialog.preview

The `preview` function is established to call a preview dialog. 
It is a base function for the Result.preview method.

## Sample

```html
<script>
	function btnClick(){
		efw.dialog.preview("a.jpg","a.jpg");
	}
</script>
<input type="button" value="preview" onclick="btnClick()">
```
## API

| Calling |
|---|
| `efw. dialog. preview ( previewUrl, fileName )` |

| Parameter | Type | Description |
|---|---|---|
| `previewUrl` | `String` | The url for the file which will be previewed. |
| `fileName` | `String` | The full name of the file. |
