# Result.progress

The `progress` function show the progress dialog to the client browser. 

## Sample

```javascript
var result = new Result();
result.progress("hello world!",30);efw.wsSend(result);
result.progress("hello world!",100,true);efw.wsSend(result);
```

## API

| Calling | Returning |
|---|---|
| `result. progress ( message, percent )` | `Result` |
| `result. progress ( message, percent, closeFlag )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `message` | `String` | The information to show in the progress dialog. |
| `percent` | `Number` | The value for the progress bar in the dialog. |
| `closeFlag` | `Boolean` | `true` to close the proress dialog. |
