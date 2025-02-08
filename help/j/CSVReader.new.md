# new CSVReader

コンストラクタ関数は、`CSVReader`オブジェクトを作成するために用意されています。

## サンプル

```javascript
//test.csvファイルの内容は
//"A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `new CSVReader ( path )` | `CSVReader` |
| `new CSVReader ( path, separator )` | `CSVReader` |
| `new CSVReader ( path, separator, delimiter )` | `CSVReader` |
| `new CSVReader ( path, separator, delimiter, encoding )` | `CSVReader` |
| `new CSVReader ( path, separator, delimiter, encoding, skipRows )` | `CSVReader` |
| `new CSVReader ( path, separator, delimiter, encoding, skipRows, rowsToRead )` | `CSVReader` |
| `new CSVReader ( path, separator, delimiter, encoding, skipRows, rowsToRead, offsetBytes, offsetRows )` | `CSVReader` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージフォルダへの相対的なCSVファイルパス。 |
| `separator` | `String` | CSVファイルの区切り文字。デフォルト値は`,`。 |
| `delimiter` | `String` | CSVファイルの引用符。デフォルト値は`"`。 |
| `encoding` | `String` | CSVファイルの文字セット名。デフォルト値はUTF-8。 |
| `skipRows` | `Number` | 読み取らずにスキップする行数。デフォルト値は-1（未定義）。 |
| `rowsToRead` | `Number` | 読み取る行数。デフォルト値は-1（未定義）。 |
| `offsetBytes` | `Number` | 行をスキップする前にオフセットするバイト数。デフォルト値は-1（未定義）。現在の位置は`csvReader._offsetBytes`で取得できます。 |
| `offsetRows` | `Number` | 行をスキップする前にオフセットする行数。デフォルト値は-1（未定義）。現在の位置は`csvReader._offsetRows`で取得できます。 |
