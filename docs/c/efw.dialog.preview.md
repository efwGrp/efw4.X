# efw.dialog.preview

`preview` 函数用于调用预览对话框。
它是 Result.preview 方法的基函数。

## 示例

```html
<script>
	function btnClick(){
		efw.dialog.preview("a.jpg","a.jpg");
	}
</script>
<input type="button" value="preview" onclick="btnClick()">
```
## API

| 调用 |
|---|
| `efw. dialog. preview ( previewUrl, fileName )` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `previewUrl` | `String` | 将要预览的文件的 URL。 |
| `fileName` | `String` | 文件的完整名称。 |
