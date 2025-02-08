# Result.confirm

The `confirm` function displays a confirmation dialog. It can only be called once. Subsequent calls have no effect. However, if `alert` has been called, the alert message will be displayed in the confirmation dialog *before* the confirmation message.

## Sample

```javascript
var result = new Result();
result.confirm("Let's do it,OK?" ,{"OK":"window.location='doit.jsp';","CANCEL":null});
```

## API

| Calling | Returning |
|---|---|
| `result. confirm ( message, buttons )` | `Result` |
| `result. confirm ( message, buttons, title )` | `Result` |
| `result. confirm ( message, buttons, params )` | `Result` |
| `result. confirm ( message, buttons, title, params )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `message` | `String` | The message to display in the confirmation dialog. Placeholders can be used: <br> ```xxxx{param1}yyy{param2}yy```<br> You can define "{param}" in the message; it will be replaced by the corresponding value in the `params` object. |
| `buttons` | `Object` | Defines the buttons and their click actions. <br> ```{buttonName1: script1, buttonName2: script2}```<br> The script will be executed on the client-side after the button is clicked. |
| `params` | `Object` | The parameters used to replace the "{param}" placeholders in the message. Example: <br>```{param1: value1,param2: value2}``` |
| `title` | `String` | The title for the confirmation dialog. |