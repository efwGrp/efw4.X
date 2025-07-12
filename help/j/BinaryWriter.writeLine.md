# BinaryWriter.writeLine

配列をファイルに書き込む関数。

## サンプル

```javascript
//test.txt ファイルの内容は
//"12345678901234567890"
var ary = new Array(2);
ary[0] = ["a","b","c"];
ary[1] = ["d","e","f"];
var binaryWriter = new BinaryWriter("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
binaryWriter.writeLine(ary);	

//test.txt ファイルの内容は次のようになります。
//"12345678901234567890a    b         c    d    e         f    "
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `binaryWriter. writeLine ( ary )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `ary` | `Array` | 書き込まれることが期待される配列。 |