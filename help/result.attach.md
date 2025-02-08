# Result.attach

The `attach` function allows downloading of files or folders.

## Sample

```javascript
var result1 = (new Result())
.attach("test1.xls")
.attach("test2.xls");
var result2 = (new Result())
.attach("temp/test1.xls","temp")
.attach("temp/test2.xls","temp");
```

## API

| Calling | Returning |
|---|---|
| `result. attach ( path )` | `Result` |
| `result. attach ( path, zipBasePath )` | `Result` |
| `result. attach ( path, zipBasePath, isAbs )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The file or folder path. |
| `zipBasePath` | `String` | The root path for creating the zip archive for download. |
| `isAbs` | `boolean` | Indicates whether the `path` is an absolute path or a relative path (relative to the storage location). |
