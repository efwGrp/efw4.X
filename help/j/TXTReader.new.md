# new TXTReader

コンストラクタ関数は、`TXTReader`オブジェクトを作成します。

## サンプル

```javascript
// test.txtファイルの内容は以下のとおりです。
// 12345678901234567890
// 11111222223333344444
// 99999777777777722222

var regFieldsDef = "(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932");

// test.txtファイルの内容は以下のとおりです。
// 123456789012345678901111122222333334444499999777777777722222

var txtReader2 = new TXTReader("input/test.txt", regFieldsDef, "MS932", 20);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `new TXTReader (path, regFieldsDef )` | `TXTReader` |
| `new TXTReader (path, regFieldsDef, encoding )` | `TXTReader` |
| `new TXTReader (path, regFieldsDef, encoding, rowSize )` | `TXTReader` |
| `new TXTReader (path, regFieldsDef, encoding, rowSize, skipRows )` | `TXTReader` |
| `new TXTReader (path, regFieldsDef, encoding, rowSize, skipRows, rowsToRead )` | `TXTReader` |

## パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ファイルまたはフォルダへの相対パス。 |
| `regFieldsDef` | `String` | 抽出するフィールドを定義する正規表現。 |
| `encoding` | `String` | テキストファイルの文字セットエンコーディング。デフォルトはUTF-8。 |
| `rowSize` | `Number` | レコードのサイズ（バイト単位）。デフォルトは-1（未定義）。 |
| `skipRows` | `Number` | 読み取り前にスキップする行数。デフォルトは-1（未定義）。 |
| `rowsToRead` | `Number` | 読み取る行数。デフォルトは-1（未定義）。 |