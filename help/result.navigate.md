# Result.navigate

The `navigate` function redirects the client to another JSP page. It can only be called once.

## Sample

```javascript
var result = new Result();
result.navigate("the next page url");
```

## API

| Calling | Returning |
|---|---|
| `result. navigate ( url )` | `Result` |
| `result. navigate ( url, params )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `url` | `String` | The URL to which the client will be navigated. |
| `params` | `Object` | The parameters to be appended to the URL. <br> ```{param1:value1, param2:value2,...}``` |