# session.get

The `get` function retrieves data from the current session.

## Sample

```javascript
var userId = session.get("USER_ID");
```

## API

| Calling | Returning |
|---|---|
| `session. get ( key )` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... |

| Parameters | Type | Description |
|---|---|---|
| `key` | `String` | The key used to identify the session information. |