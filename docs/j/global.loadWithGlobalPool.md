# loadWithGlobalPool

`loadWithGlobalPool`関数は、スクリプトオブジェクトからスクリプトをロードして評価するために使用され、プールを利用してスクリプトのコンテキストを管理します。

## サンプル

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

| パラメータ | 型 | 説明 |
|---|---|---|
| `name` | `String` | プールの名前。 |
| `max` | `Number` | プールの最大サイズ。 |
| `initializer` | `String` | スクリプトコンテキストの初期化時にプールによって実行されるスクリプト文字列。 |
| `script` | `String` | 呼び出し時にプールによって実行されるスクリプト文字列。 |
| `context` | `Object` | `context`パラメータの属性は、スクリプトコンテキストのグローバルスコープに設定されます。 |
| `engine` | `String` | プール内のエンジンの名前。"nashorn" または "javet" のみが許可されています。 |
| `returnVar` | `String` \| `Number` \| `Boolean` \| `Date` \| `Array` \| `Object` \| ...  | 戻り値を取得するための変数名。 |