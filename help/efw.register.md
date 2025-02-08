# efw.register

The `register` function is established to register a key in `efw` to prevent the system from recognizing it as an illegal global variable.

## Sample

```javascript
load(_eventfolder+"/pdf-lib.min.js");
load(_eventfolder+"/fontkit.umd.min.js");
efw.register("PDFLib");
efw.register("fontkit");
```

## API

| Calling | Returning |
|---|---|
| `efw. register ( key )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `key` | `String` | The name of the global variable to be registered. |