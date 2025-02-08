# CSVReader.loopAllLines

コールバック関数を呼び出すために、すべての行をループする関数。

## サンプル

```javascript
//test.csvファイルの内容は
//"A,B,C,D\r\n
// 1,2,3,4\r\n
// a,b,c,d\r\n"
var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
csvReader.loopAllLines(callback,"\r\n");	// 関数"callback"は3回実行されます

function callback(aryField, index) {
	...
};
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `csvReader. loopAllLines ( callback )` | `Array` |
| `csvReader. loopAllLines ( callback, CRLFCode )` | `Array` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `callback(aryField, index)` | `Function` | 行ごとに実行されることが期待される関数。<br>`aryField`: 配列データ。<br>`index`: 0からカウントされる行番号。 |
| `CRLFCode` | `String` | 改行コードを定義します。例：`\r\n`、`\n` |