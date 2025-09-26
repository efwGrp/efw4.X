# efw.dialog.wait

`wait` 函数用于调用倒计时对话框进行等待。它是 Web Event 服务的基础函数。

## 示例

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

| 调用 |
|---|
| `efw. dialog. wait ( message, countdown )` |
| `efw. dialog. wait ( message, countdown, title )` |
| `efw. dialog. wait ( message, countdown, title, callback )` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `message` | `String` | 等待对话框中显示的信息。 |
| `countdown` | `Number` | 等待的秒数。 |
| `title` | `String` | 等待对话框的标题。 |
| `callback` | `Function` | 等待对话框关闭后将调用的回调函数。 |