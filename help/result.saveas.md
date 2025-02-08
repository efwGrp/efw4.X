# Result.saveas

The `saveas` function renames the file when it is downloaded.

## Sample

```javascript
var result = new Result();
result.attach("test.xls")
    .saveas("hello.xls");
```

## API

| Calling | Returning |
|---|---|
| `result. saveas ( filename )` | `Result` |
| `result. saveas ( filename, password )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `filename` | `String` | The filename for saving. |
| `password` | `String` | If a folder or multiple files are attached, you can save them all to a named, password-protected zip archive. |