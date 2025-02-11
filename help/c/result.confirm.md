# Result.confirm

`confirm` 函数显示一个确认对话框。它只能被调用一次。后续调用无效。但是，如果调用了 `alert`，则警告消息将*在*确认消息*之前*显示在确认对话框中。

## 示例

```javascript
var result = new Result();
result.confirm("Let's do it,OK?" ,{"OK":"window.location='doit.jsp';","CANCEL":null});
```

## API

| 调用 | 返回值 |
|---|---|
| `result. confirm ( message, buttons )` | `Result` |
| `result. confirm ( message, buttons, title )` | `Result` |
| `result. confirm ( message, buttons, params )` | `Result` |
| `result. confirm ( message, buttons, title, params )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `message` | `String` | 要在确认对话框中显示的消息。可以使用占位符：<br> ```xxxx{param1}yyy{param2}yy```<br> 您可以在消息中定义“{param}”；它将被 `params` 对象中相应的值替换。 |
| `buttons` | `Object` | 定义按钮及其单击操作。<br> ```{buttonName1: script1, buttonName2: script2}```<br> 脚本将在客户端单击按钮后执行。 |
| `params` | `Object` | 用于替换消息中“{param}”占位符的参数。示例：<br>```{param1: value1,param2: value2}``` |
| `title` | `String` | 确认对话框的标题。 |