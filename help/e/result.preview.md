# Result.preview

The `preview` function preview a server file from the client browser. 

## Sample

```javascript
var result = new Result();
result.preview("my.pdf");
```

## API

| Calling | Returning |
|---|---|
| `result. preview ( path )` | `Result` |
| `result. preview ( path , isAbs )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The file path. |
| `isAbs` | `boolean` | Indicates whether the `path` is an absolute path or a relative path (relative to the storage location). |
