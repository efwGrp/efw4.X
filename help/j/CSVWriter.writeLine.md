# CSVWriter.writeLine

配列をファイルに書き込む関数。

## サンプル

```javascript
//test.csvファイルの内容は
//"1234567890,0987654321"
var ary = new Array(2);
ary[0] = "887766,554433";
ary[1] = "1111,2222";
var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");
csvWriter.writeLine(ary);	

//test.csvファイルの内容は次のようになります。
//"1234567890,0987654321
// 887766,554433
// 1111,2222"
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `csvWriter. writeLine ( ary )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `ary` | `Array` | 書き込まれることが期待される配列。 |