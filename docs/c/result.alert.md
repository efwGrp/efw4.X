# Result.alert

`alert` 函数显示一个警告对话框。多次调用 `alert` 会连接警告消息。

## 示例

```javascript
var result = new Result();
result.alert("good morning!").alert("good night!");
```

## API

| 调用 | 返回值 |
|---|---|
| `result. alert ( message )` | `Result` |
| `result. alert ( message, title )` | `Result` |
| `result. alert ( message, params )` | `Result` |
| `result. alert ( message, title, params )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `message` | `String` | 要在警告对话框中显示的消息。可以使用占位符：<br> ```xxxx{param1}yyy{param2}yy``` <br>您可以在消息中定义“{param}”；它将被 `params` 对象中相应的值替换。 |
| `params` | `Object` | 用于替换消息中“{param}”占位符的参数。示例：<br> ```{param1: value1, param2: value2 }``` |
| `title` | `String` | 警告对话框的标题。 |