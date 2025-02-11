# file.move

The `move` function is used to move an original file or folder to a new location. If the destination already exists, it will *not* be overwritten.

## Sample

```javascript
file.move("myFile.txt","yourFile.txt");
file.move("myFolder","yourFolder");
```

## API

| Calling | Returning |
|---|---|
| `file. move ( orgPath, newPath )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `orgPath` | `String` | The relative file or folder path to the storage (source). |
| `newPath` | `String` | The relative file or folder path to the storage (destination). |