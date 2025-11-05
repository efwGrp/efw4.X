# context.get

The `get` function retrieves data from the context.

## Sample

```javascript
var content = context.get("BROADCAST_CONTENT");
```

## API

| Calling | Returning |
|---|---|
| `context. get ( key )` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... |

| Parameters | Type | Description |
|---|---|---|
| `key` | `String` | The key used to identify the context information. |