# db._rollback

The `_rollback` function is established to rollback a transaction. By default, it does not need to be called explicitly.

## Sample

```javascript
try{
	db.change("TB1","deleteAll",{});
	db._commit();
}catch(e){
	db._rollback();
}
```

## API

| Calling | Returning |
|---|---|
| `db. _rollback ( )` | `void` |
| `db. _rollback ( jdbcResourceName )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `jdbcResourceName` | `String` | To operate the transaction for another database resource, not the default. |

