# efw.register

`register`関数は、システムがそれを不正なグローバル変数として認識するのを防ぐために、キーを`efw`に登録するために用意されています。

## サンプル

```javascript
load(_eventfolder+"/pdf-lib.min.js");
load(_eventfolder+"/fontkit.umd.min.js");
efw.register("PDFLib");
efw.register("fontkit");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `efw. register ( key )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `key` | `String` | 登録するグローバル変数の名前。 |