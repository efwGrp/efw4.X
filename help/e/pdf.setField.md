# Pdf.setField

The `setField` function is used to set a value into a field.

## Sample

```javascript
var pdf = new Pdf("mytemplate.pdf");
pdf
.setField("field1","helloworld")
.save("my.pdf").close();
```

## API

| Calling | Returning |
|---|---|
| `pdf. setField ( fieldName, fieldValue )` | `Pdf` |

| Parameters | Type | Description |
|---|---|---|
| `fieldName` | `String` | The field name. |
| `fieldValue` | `String` | The value for setting into a field. |
