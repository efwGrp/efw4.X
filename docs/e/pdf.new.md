# new Pdf

The constructor function is used to open an existing Pdf file. Even if you want to create a new Pdf file, you must create it from a template file.

## Sample

```javascript
var pdf = new Pdf("mytemplate.pdf");
```

## API

| Calling | Returning |
|---|---|
| `new Pdf ( path )` | `Pdf` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The Pdf file path relative to the storage folder. |
