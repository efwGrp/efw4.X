# new CSVWriter

コンストラクタ関数は、`CSVWriter`オブジェクトを作成するために用意されています。

## サンプル

```javascript
//test.csvファイルの内容は
//"A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvWriter = new CSVWriter("input/test.txt", ",", "\"", "MS932");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `new CSVWriter ( path )` | `CSVWriter` |
| `new CSVWriter ( path, separator )` | `CSVWriter` |
| `new CSVWriter ( path, separator, delimiter )` | `CSVWriter` |
| `new CSVWriter ( path, separator, delimiter, encoding )` | `CSVWriter` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージフォルダへの相対的なCSVファイルパス。 |
| `separator` | `String` | CSVファイルの区切り文字。デフォルト値は`,`。 |
| `delimiter` | `String` | CSVファイルの引用符。デフォルト値は`"`。 |
| `encoding` | `String` | CSVファイルの文字セット名。デフォルト値はUTF-8。 |