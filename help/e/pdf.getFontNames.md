# Pdf.getFontNames

The `getFontNames` function is used to get all names of font files in a folder.

## Sample

```javascript
var ary = Pdf.getFontNames("fonts");
```

## API

| Calling | Returning |
|---|---|
| `Pdf. getFontNames ( fontsPath )` | `Array` |
| `Pdf. getFontNames ( fontsPath, fontsPathIsAbs )` | `Array` |

| Parameters | Type | Description |
|---|---|---|
| `fontsPath` | `String` | The folder path for font files. |
| `fontsPathIsAbs` | `Boolean` | Specifies whether the fontsPath is an absolute path. |
