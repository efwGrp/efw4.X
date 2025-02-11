# CSVWriter.writeAllLines

该函数用于将所有行写入文件。

## 示例

```javascript
// test.csv 文件的内容是
// "A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");
var ary = [
	["Z,X,C,V"],
	["Q,W,E,R"]
];
csvWriter.writeAllLines(ary);

// test.csv 文件的内容变为：
// "A,B,C,D
// 1,2,3,4
// a,b,c,d
// Z,X,C,V
// Q,W,E,R"
```

## API

| 调用 | 返回值 |
|---|---|
| `csvWriter. writeAllLines ( ary )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `ary` | `Array` | 期望被写入的数组矩阵。 |