# file.readAllBytes

The `readAllBytes` function is used to load a binary file into a byte array.

## Sample

```javascript
var ary = file.readAllBytes("Roboto-Italic.ttf");
var uint8Array = new Uint8Array(ary.length);
uint8Array.set(Java.from(ary));

```

## API

| Calling | Returning |
|---|---|
| `file . readAllBytes ( path )` | `byte[]` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative file path to the storage. |