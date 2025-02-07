# file.list

The `list` function is used to retrieve an array of file or subfolder information.

## Sample

```javascript
var infos = file.list("myFolder");
```

## API

| Calling | Returning |
|---|---|
| `file . list ( path )` | Array of [FileInfo](file.FileInfo.md) |
| `file . list ( path , withoutFolderLength )` | Array of [FileInfo](file.FileInfo.md) |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative folder path to the storage. |
| `withoutFolderLength` | `Boolean` | A flag to indicate whether to calculate subfolder sizes. The default value is `false`. |
