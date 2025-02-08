# Result.runat

The `runat` function specifies the target element on the web page where subsequent operations (like `remove`, `append`, `withdata` etc.) will be applied.  It essentially sets the context for those operations.

## Sample

```javascript
var result = new Result();
result.runat("#table1");
```

## API

| Calling | Returning |
|---|---|
| `result. runat ( )` | `Result` |
| `result. runat ( selector )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `selector` | `String` | A jQuery selector identifying the element where the data will be displayed. The default is `"body"`. |