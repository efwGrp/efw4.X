# efw.dialog.alert

`alert` 函数用于调用带有指定按钮的客户端警报。它是 `Result.alert` 和 `Result.confirm` 的基础函数。

## 示例

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

| 调用 |
|---|
| `efw. dialog. alert ( message )` |
| `efw. dialog. alert ( message, buttons )` |
| `efw. dialog. alert ( message, buttons, title )` |
| `efw. dialog. alert ( message, buttons, title, callback )` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `message` | `String` | 警报对话框中显示的信息。 |
| `buttons` | `Object` | 定义按钮及其点击操作。<br>```{buttonName1: script1, buttonName2: script2}```<br>脚本将在客户端按钮被点击后运行。 |
| `title` | `String` | 警报对话框的标题。 |
| `callback` | `Function` | 警报对话框关闭后将调用的回调函数。 |