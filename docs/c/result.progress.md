# Result.progress

`progress` 函数会向客户端浏览器显示进度对话框。

## 示例

```javascript
var result = new Result();
result.progress("hello world!",30);efw.wsSend(result);
result.progress("hello world!",100,true);efw.wsSend(result);
```

## API

| 调用 | 返回值 |
|---|---|
| `result. progress ( message, percent )` | `Result` |
| `result. progress ( message, percent, closeFlag )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `message` | `String` | 要在进度对话框中显示的信息。 |
| `percent` | `Number` | 对话框中进度条的值。 |
| `closeFlag` | `Boolean` | `true`关闭进度对话框。 |
