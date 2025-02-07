# file.writeAllLines

The `writeAllLines` function is used to write all lines to a text file.

## Sample

```javascript
file.writeAllLines("myFolder/myFile.txt","abcdefghijklmn","UTF-8");
```

## API

| Calling | Returning |
|---|---|
| `file . writeAllLines ( path, content )` | `String` |
| `file . writeAllLines ( path, content, encoding )` | `String` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative text file path to the storage folder. |
| `content` | `String` | The text content to be saved. |
| `encoding` | `String` | The charset name of the text file. The default value is UTF-8. |