# db.master

The `master` function is established to store the data from a master table into memory. Its return is an instance of the [Record](record.md) class. The first call to a master table loads it into memory, and subsequent calls retrieve records from memory.

## Sample for Event

```javascript
var record1 = db.master("user").sort("years", "asc");
var record2 = db.master("user", true);
```

## API

| Calling | Returning |
|---|---|
| `db. master ( masterId )` | [`Record`](record.md) |
| `db. master ( masterId, reload )` | [`Record`](record.md) |
| `db. master ( masterId, jdbcResourceName )` | [`Record`](record.md) |
| `db. master ( masterId, reload, jdbcResourceName )` | [`Record`](record.md) |

| Parameter | Type | Description |
|---|---|---|
| `masterId` | `String` | The name of a master table. |
| `reload` | `Boolean` | The flag to reload the master table, even if it has already been loaded. |
| `jdbcResourceName` | `String` | To execute SQL in another database resource, not the default. |
