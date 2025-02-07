# efw.contains

The `contains` function is established to check whether a key has been registered in `efw`.

## Sample

```javascript
if (!efw.contains("PDFLib")){
	load(_eventfolder+"/pdf-lib.min.js");
	load(_eventfolder+"/fontkit.umd.min.js");
	efw.register("PDFLib");
	efw.register("fontkit");
};
```
## API

| Calling | Returning |
|---|---|
| `efw.contains(key)` | `boolean` |

| Parameters | Type | Description |
|---|---|---|
| `key` | `String` | The name of the global variable to be registered. |