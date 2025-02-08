# file.get

The `get` function is used to retrieve information about a file or folder.

## Sample

```javascript
var infoFile = file.get("myFile.txt");
var infoFolder = file.get("myFolder");
```

## API

| Calling | Returning |
|---|---|
| `file. get ( path )` | [FileInfo](file.FileInfo.md) |
| `file. get ( path, withoutFolderLength )` | [FileInfo](file.FileInfo.md) |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative file or folder path to the storage. |
| `withoutFolderLength` | `Boolean` | A flag to indicate whether to calculate folder size. The default value is `false`. |