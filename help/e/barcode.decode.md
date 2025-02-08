# barcode.decode

The `decode` function is used to decode a barcode image file and retrieve its value. If the barcode cannot be decoded, the function returns `null`.

## Sample

```javascript
var msg = barcode.decode("test.png");
```

## API

| Calling | Returning |
|---|---|
| `barcode. decode ( imagePath )` | `String` |

| Parameters | Type | Description |
|---|---|---|
| `imagePath` | `String` | The barcode image file path relative to the storage folder. |