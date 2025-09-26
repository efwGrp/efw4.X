# Result.deleteAfterDownload

The `deleteAfterDownload` function specifies that files or folders should be deleted after they have been downloaded.

## Sample

```javascript
var result = new Result();
result
.attach("test.xls")
.deleteAfterDownload();
```

## API

| Calling | Returning |
|---|---|
| `result . deleteAfterDownload ( )` | `Result` |
