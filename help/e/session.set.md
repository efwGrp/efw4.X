# session.set

The `set` function stores data in the current session.

## Sample

```javascript
session.set("USER_ID", "Wang");
```
## API

| Calling | Returning |
|---|---|
| `session. set ( key, value )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `key` | `String` | The key used to identify the session information. |
| `value` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... | The information to store in the session. |