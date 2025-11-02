# efw.wsSend

`wsSend` 函数用于在事件运行时向客户端发送结果。它只能在 Efw 函数处于 WebSocket 模式时调用。

如果发送成功，则返回 `true`；否则返回 `false`。

## 示例

```javascript
efw.wsSend(new Result().progress("hello world!",30));
efw.wsSend(new Result().progress("hello world!",100,true));
```
## API

| 调用 | 返回值 |
|---|---|
| `efw. wsSend ( result )` | `Boolean` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `result` | `Result` | 要发送的结果对象。 |