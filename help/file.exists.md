# file.exists

The `exists` function is used to determine whether a file or folder exists.

## Sample

```javascript
var tf = file.exists("myFile.txt");
var tf = file.exists("myFolder");
```

## API

| Calling | Returning |
|---|---|
| `file.exists(path)` | `Boolean` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative file or folder path to the storage. |