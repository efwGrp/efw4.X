# file.rename

The `rename` function is used to rename a file or folder.

## Sample

```javascript
file.rename("myFolder/myFile.txt","yourFile.txt");
file.rename("myFolder","yourFolder");
```

## API

| Calling | Returning |
|---|---|
| `file . rename ( orgPath, newName )` |  |

| Parameters | Type | Description |
|---|---|---|
| `orgPath` | `String` | The relative file or folder path to the storage (source). |
| `newName` | `String` | The new file or folder name. |