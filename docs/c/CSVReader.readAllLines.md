# CSVReader.readAllLines

该函数将所有行读取到数组矩阵中。

## 示例

```javascript
// test.csv 文件的内容是
// "A,B,C,D\r\n
// 1,2,3,4\r\n
// a,b,c,d\r\n"
var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
var array = csvReader.readAllLines("\r\n");	

// 数组返回值是
// ["A","B","C","D"],
// ["1","2","3","4"],
// ["a","b","c","d"]
```

## API

| 调用 | 返回值 |
|---|---|
| `csvReader. readAllLines ( )` | `Array` |
| `csvReader. readAllLines ( CRLFCode )` | `Array` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `CRLFCode` | `String` | 定义换行符的代码。例如 `\r\n`、`\n` |