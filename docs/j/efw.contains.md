# efw.contains

`contains`関数は、キーが`efw`に登録されているかどうかを確認するために用意されています。

## サンプル

```javascript
if (!efw.contains("PDFLib")){
    load(_eventfolder+"/pdf-lib.min.js");
    load(_eventfolder+"/fontkit.umd.min.js");
    efw.register("PDFLib");
    efw.register("fontkit");
};
```
## API

| 呼び出し | 戻り値 |
|---|---|
| `efw. contains ( key )` | `boolean` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `key` | `String` | 登録するグローバル変数の名前。 |