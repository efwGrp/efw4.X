# loadWithGlobalPool

`loadWithGlobalPool` 函数用于从脚本对象加载和评估脚本，并利用池来管理脚本的上下文。

## 示例

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

| 参数 | 类型 | 描述 |
|---|---|---|
| `name` | `String` | 池的名称。 |
| `max` | `Number` | 池的最大大小。 |
| `initializer` | `String` | 初始化脚本上下文时，由池执行的脚本字符串。 |
| `script` | `String` | 调用时由池执行的脚本字符串。 |
| `context` | `Object` | `context` 参数的属性将设置到脚本上下文的全局作用域中。 |
| `engine` | `String` | 池中引擎的名称。只允许使用 "nashorn" 或 "javet"。 |
| `returnVar` | `String` \| `Number` \| `Boolean` \| `Date` \| `Array` \| `Object` \| ...  | 用于检索返回值的变量名。 |