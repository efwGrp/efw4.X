# BinaryReader.readAllLines

该函数将所有行读取到数组矩阵中。

## 示例

```javascript
// test.txt 文件的内容是
// "123456789012345678901111122222333334444499999777777777722222"
var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
var array = binaryReader.readAllLines();	

// 数组返回值是
// [ ["12345","6789012345","67890"]
// ["11111","2222233333","44444"]
// ["99999","7777777777","22222"] ]
```

## API

| 调用 | 返回值 |
|---|---|
| `binaryReader. readAllLines ( )` | `Array` |