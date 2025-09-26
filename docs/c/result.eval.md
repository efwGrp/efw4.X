# Result.eval

`eval` 函数在客户端执行 JavaScript 脚本。它可以被多次调用。

## 示例

```javascript
var result = new Result()
.eval("$('#table1 tr:even').css('background-color','green');")
.eval("$('#table1 tr:odd').css('background-color','yellow');");
```

## API

| 调用 | 返回值 |
|---|---|
| `result. eval ( script )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `script` | `String` | 要在网页上执行的 JavaScript 代码。 |