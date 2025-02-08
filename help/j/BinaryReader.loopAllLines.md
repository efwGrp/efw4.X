# BinaryReader.loopAllLines

コールバック関数を呼び出すために、すべての行をループする関数。

## サンプル

```javascript
//test.txtファイルの内容は
//"123456789012345678901111122222333334444499999777777777722222"
var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);?
binaryReader.loopAllLines(callback);	// 関数"callback"は3回実行されます

function callback(aryField, index) {
	...
};
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `binaryReader.loopAllLines(callback)` | `Array` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `callback(aryField, index)` | `Function` | 行ごとに実行されることが期待される関数。<br> `aryField`: 配列データ。<br> `index`: 0からカウントされる行番号。 |