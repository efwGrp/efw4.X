# Batch.log

The `log` function is used to save a message to the batch log file.

## Sample

```javascript
var batch = new Batch();
batch.log("good morning!").log("good night!");
```

## API

| Calling | Returning |
|---|---|
| `Batch . log ( message )` | `Batch` |

| Parameters | Type | Description |
|---|---|---|
| `message` | `String` | The information to save to the log file. |