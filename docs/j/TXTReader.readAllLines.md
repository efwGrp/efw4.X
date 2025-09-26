# TXTReader.readAllLines

`readAllLines`関数は、テキストファイルからすべての行を読み取り、配列の行列に格納します。

## サンプル

```javascript
// test.txtファイルの内容は以下のとおりです。
// 12345678901234567890
// 11111222223333344444
// 99999777777777722222

var regFieldsDef = "(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932");
var array = txtReader.readAllLines();

// 戻り値の配列は以下のとおりです。
// [
//   ["12345", "6789012345", "67890"],
//   ["11111", "2222233333", "44444"],
//   ["99999", "7777777777", "22222"]
// ]
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `txtReader. readAllLines ( )` | `Array` |