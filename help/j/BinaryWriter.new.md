# new BinaryWriter

コンストラクタ関数は、`BinaryWriter` オブジェクトを作成するために用意されています。

## Sample

```javascript
//出力ファイル test.txt の内容は
//"123456789012345678901111122222333334444499999777777777722222"
var binaryWriter = new BinaryWriter("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `new BinaryWriter ( path, aryFieldsDef, aryEncoding, rowSize )` | `BinaryWriter` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージへの相対的なファイルまたはフォルダパス。 |
| `aryFieldsDef` | `Array` | すべてのフィールド長を定義する配列。|
| `aryEncoding` | `Array` | すべてのフィールドの文字セット名を定義する配列。 |
| `rowSize` | `Number` | レコードのバイナリサイズ。 |
