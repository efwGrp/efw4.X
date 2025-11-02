# efw.wsSend

The `wsSend` function is established to send a result to client in the event running.
It only can be called when Efw function is in websocket mode.

If the sending is succeed, it will return `true`, or it will return `false`.

## Sample

```javascript
efw.wsSend(new Result().progress("hello world!",30));
efw.wsSend(new Result().progress("hello world!",100,true));
```
## API

| Calling | Returning |
|---|---|
| `efw. wsSend ( result )` | `Boolean` |

| Parameters | Type | Description |
|---|---|---|
| `result` | `Result` | The result object for sending. |