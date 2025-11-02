# efw.dialog.progress

`progress` 函数用于调用进度对话框。它是 Result.progress 方法的基础函数。

## 示例

```html
<script>
	function btnClick(){
		efw.dialog.progress("hello world ! ",20);
	}
</script>
<input type="button" value="preview" onclick="btnClick()">
```
## API

| 调用 |
|---|
| `efw. dialog. progress ( message, percent )` |
| `efw. dialog. progress ( message, percent, closeFlag )` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `message` | `String` | 要在进度对话框中显示的信息。 |
| `percent` | `Number` | 对话框中进度条的值。 |
| `closeFlag` | `Boolean` | `true` 关闭进度对话框。 |
