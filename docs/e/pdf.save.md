# Pdf.save

The `save` function is used to save the Pdf object to a file.

## Sample

```javascript
var pdf = new Pdf("mytemplate.pdf");
pdf.save("my.pdf").close();
```

## API

| Calling | Returning |
|---|---|
| `pdf. save ( path )` | `Pdf` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The Pdf file path relative to the storage folder. |
