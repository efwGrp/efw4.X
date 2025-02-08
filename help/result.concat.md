# Result.concat

The `concat` function concatenates the current result with another `Result` object.

## Sample

```javascript
var result = new Result();
result.concat(event.fire("subEvent"));
```

## API

| Calling | Returning |
|---|---|
| `result. concat ( result )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `result` | `Result` | The other `Result` object to concatenate with. |