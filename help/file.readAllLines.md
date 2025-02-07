# file.readAllLines

The `readAllLines` function is used to read all lines from a text file.

## Sample

```javascript
var txt = file.readAllLines("myFolder/myFile.txt");
var txt = file.readAllLines("myFolder/myFile.txt", "UTF-8");
```

## API

| Calling | Returning |
|---|---|
| `file . readAllLines ( path )` | `String` |
| `file . readAllLines ( path, encoding )` | `String` |

| Parameters | Type | Description |
|---|---|---|
| `path` | `String` | The relative text file path to the storage folder. |
| `encoding` | `String` | The charset name of the text file. The default value is UTF-8. |