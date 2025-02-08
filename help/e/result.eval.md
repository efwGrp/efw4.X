# Result.eval

The `eval` function executes a JavaScript script on the client-side. It can be called multiple times.

## Sample

```javascript
var result = new Result();
result
.eval("<span class="math-inline">\('\#table1 tr\:even'\)\.css\('background\-color','green'\);"\)
\.eval\("</span>('#table1 tr:odd').css('background-color','yellow');");
```

## API

| Calling | Returning |
|---|---|
| `result. eval ( script )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `script` | `String` | The JavaScript code to be executed on the web page. |
