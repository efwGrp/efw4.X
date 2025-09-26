# BinaryWriter.writeAllLines

すべての行をファイルに書き込む関数。

## Sample

```javascript
//test.txtファイルの内容は
//"12345678901234567890"
var binaryWriter = new BinaryWriter("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
var ary = new Array(2);
ary[0] = ["a","b","c"];
ary[1] = ["d","e","f"];
binaryWriter.writeAllLines(ary);

//test.txtファイルの内容は次のようになります。
//"a    b         c    d    e         f    "
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `binaryWriter. writeAllLines ( ary )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `ary` | `Array` | 書き込まれることが期待される配列の行列。 |