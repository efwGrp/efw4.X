# new BinaryReader

コンストラクタ関数は、BinaryReaderオブジェクトを作成するために用意されています。

## サンプル

```javascript
//test.txtファイルの内容は
//"123456789012345678901111122222333334444499999777777777722222"
var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `new BinaryReader ( path, aryFieldsDef, aryEncoding, rowSize )` | `binaryReader` |
| `new BinaryReader ( path, regFieldsDef, aryEncoding, rowSize, skipRows )` | `binaryReader` |
| `new BinaryReader ( path, regFieldsDef, aryEncoding, rowSize, skipRows, rowsToRead )` | `binaryReader` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージへの相対的なファイルまたはフォルダパス。 |
| `aryFieldsDef` | `Array` | すべてのフィールド長を定義する配列。 |
| `aryEncoding` | `Array` | すべてのフィールドの文字セット名を定義する配列。 |
| `rowSize` | `Number` | レコードのバイナリサイズ。 |
| `skipRows` | `Number` | 読み取らずにスキップする行数。デフォルト値は-1で未定義を意味します。 |
| `rowsToRead` | `Number` | 読み取る行数。デフォルト値は-1で未定義を意味します。 |