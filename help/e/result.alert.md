# Result.alert

The `alert` function displays an alert dialog.  Multiple calls to `alert` will concatenate the alert messages.

## Sample

```javascript
var result = new Result();
result.alert("good morning!").alert("good night!");
```

## API

| Calling | Returning |
|---|---|
| `result. alert ( message )` | `Result` |
| `result. alert ( message, title )` | `Result` |
| `result. alert ( message, params )` | `Result` |
| `result. alert ( message, title, params )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `message` | `String` | The message to display in the alert dialog. Placeholders can be used: <br> ```xxxx{param1}yyy{param2}yy``` <br>You can define "{param}" in the message; it will be replaced by the corresponding value in the `params` object. |
| `params` | `Object` | The parameters used to replace the "{param}" placeholders in the message. Example: <br> ```{param1: value1, param2: value2 }``` |
| `title` | `String` | The title for the alert dialog. |
