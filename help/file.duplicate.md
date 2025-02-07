# file.duplicate

The `duplicate` function is used to create a copy of a file or folder. If the destination already exists, it will *not* be overwritten.

## Sample

```javascript
file.duplicate("myFile.txt","yourFile.txt");
file.duplicate("myFolder","yourFolder");
```

## API

| Calling | Returning |
|---|---|
| `file.duplicate(srcPath, destPath)` | `Boolean` |

| Parameters | Type | Description |
|---|---|---|
| `srcPath` | `String` | The relative file or folder path to the storage for copying. |
| `destPath` | `String` | The relative file or folder path to the storage for saving. |