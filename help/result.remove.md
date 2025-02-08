# Result.remove

The `remove` function removes elements from the element specified by the most recent `runat` call. It can only be called once per `runat`. Subsequent calls within the same `runat` have no effect.

## Sample

```javascript
var result = new Result();
result
.runat("#table1")
.remove("tr");
```

## API

| Calling | Returning |
|---|---|
| `result. remove ( selector )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `selector` | `String` | A jQuery selector identifying the elements to be removed. |
