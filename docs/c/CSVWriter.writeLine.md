# CSVWriter.writeLine

该函数用于将数组写入文件。

## 示例

```javascript
// test.csv 文件的内容是
// "1234567890,0987654321"
var ary = new Array(2);
ary[0] = ["887766","554433"];
ary[1] = ["1111","2222"];
var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");
csvWriter.writeLine(ary);	

// test.csv 文件的内容变为：
// "1234567890,0987654321
// 887766,554433
// 1111,2222"
```

## API

| 调用 | 返回值 |
|---|---|
| `csvWriter. writeLine ( ary )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `ary` | `Array` | 期望被写入的数组。 |