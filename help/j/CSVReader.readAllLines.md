# CSVReader.readAllLines

すべての行を配列の行列に読み込む関数。

## サンプル

```javascript
//test.csvファイルの内容は
//"A,B,C,D\r\n
// 1,2,3,4\r\n
// a,b,c,d\r\n"
var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
var array = csvReader.readAllLines("\r\n");	

//配列の戻り値は
//["A","B","C","D"],
//["1","2","3","4"],
//["a","b","c","d"]
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `csvReader. readAllLines ( )` | `Array` |
| `csvReader. readAllLines ( CRLFCode )` | `Array` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `CRLFCode` | `String` | 改行コードを定義します。例：`\r\n`、`\n` |