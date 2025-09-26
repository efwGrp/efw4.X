# loadWithGlobalPool

The `loadWithGlobalPool` function is used to load and evaluate a script from a script object, utilizing a pool to manage the script's context.

## Sample

```javascript
var runscript = `
    var pdfDataUri;
    for (var i = 0; i < 10; i++) {
        var pdfDoc = await(PDFLib.PDFDocument.create());
        var page = pdfDoc.addPage([350, 400]);
        page.moveTo(110, 200);
        page.drawText(msg);
        pdfDataUri = await(pdfDoc.saveAsBase64({ dataUri: true }));
    }
    pdfDataUri;
`;
var pdfDataUri = loadWithGlobalPool({
    name: "pdf-lib",
    max: 3,
    initializer: "load(_eventfolder+'/pdf-lib.min.js');",
    script: runscript,
    context: { msg: "Hello World!" },
    engine: "nashorn",
    returnVar: "pdfDataUri"
});
return new Result().eval("$('" + params.pdf + "')[0].src='" + pdfDataUri + "'");
```
## API

| Parameters | Type | Description |
|---|---|---|
| `name` | `String` | The name of the pool. |
| `max` | `Number` | The maximum size of the pool. |
| `initializer` | `String` | Script string executed by the pool when initializing the script context. |
| `script` | `String` | Script string executed by the pool on call. |
| `context` | `Object` | The attributes of the `context` parameter will be set into the global scope of the script context. |
| `engine` | `String` | The name of the engine in the pool. Only "nashorn" or "javet" are allowed. |
| `returnVar` | `String` \| `Number` \| `Boolean` \| `Date` \| `Array` \| `Object` \| ...  | The variable name to retrieve the return value. |
