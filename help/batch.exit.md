# Batch.exit

The `exit` function is used to set the ERRORLEVEL of the batch execution.

## Sample

```javascript
var batch = new Batch();
batch.exit(1);
```

## API

| Calling | Returning |
|---|---|
| `batch. exit ( level )` | `Batch` |

| Parameters | Type | Description |
|---|---|---|
| `level` | `Number` | An integer for ERRORLEVEL. |
