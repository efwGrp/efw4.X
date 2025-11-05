# context.set

The `set` function stores data in the context.

## Sample

```javascript
context.set("BROADCAST_CONTENT", "hello the time is "
	+new Date().format("yyyy/MM/dd HH:mm:ss"));
```
## API

| Calling | Returning |
|---|---|
| `context. set ( key, value )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `key` | `String` | The key used to identify the context information. |
| `value` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... | The information to store in the context. |