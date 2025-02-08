# BinaryReader.readAllLines

すべての行を配列の行列に読み込む関数。

## サンプル

```javascript
//test.txtファイルの内容は
//"123456789012345678901111122222333334444499999777777777722222"
var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20); 
var array = binaryReader.readAllLines();	

//配列の戻り値は
//[ ["12345","6789012345","67890"]
//  ["11111","2222233333","44444"]
//  ["99999","7777777777","22222"] ]
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `binaryReader. readAllLines ( )` | `Array` |