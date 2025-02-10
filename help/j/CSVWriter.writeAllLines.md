# CSVWriter.writeAllLines

すべての行をファイルに書き込む関数。

## サンプル

```javascript
//test.csvファイルの内容は
//"A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");
var ary = [
	["Z,X,C,V"],
	["Q,W,E,R"]
];
csvWriter.writeAllLines(ary);

//test.csvファイルの内容は次のようになります。
//"A,B,C,D
// 1,2,3,4
// a,b,c,d
// Z,X,C,V
// Q,W,E,R"
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `csvWriter. writeAllLines ( ary )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `ary` | `Array` | 書き込まれることが期待される配列の行列。 |