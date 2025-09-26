# TXTReader.loopAllLines

`loopAllLines`関数は、テキストファイル内のすべての行を反復処理し、各行に対してコールバック関数を呼び出します。

## サンプル

```javascript
// test.txtファイルの内容は以下のとおりです。
// 12345678901234567890
// 11111222223333344444
// 99999777777777722222

var regFieldsDef = "(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932");
txtReader.loopAllLines(callback); // コールバック関数は3回実行されます。

function callback(aryField, index) {
  // ... ここにあなたのコード ...
}
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `txtReader. loopAllLines ( callback )` | `void` |

## パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `callback ( aryField, index )` | `Function` | 各行に対して実行される関数。<br>`aryField`: 現在の行のフィールド値の配列。<br>`index`: 行番号（0から開始）。 |
