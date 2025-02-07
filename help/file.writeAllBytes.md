# file.writeAllBytes

The `writeAllBytes` function is used to write all binary bytes to a file.

## Sample

```javascript
var ary = file.readAllBytes("Roboto-Italic.ttf");
file.writeAllBytes("test.ttf", ary);

```

## API

| Calling | Returning |
|---|---|
| `file . writeAllBytes ( path, content )` | `byte[]` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative file path to the storage. |
| `content` | `byte[]` | The byte array to write. |
