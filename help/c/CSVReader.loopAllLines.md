# CSVReader.loopAllLines

该函数用于循环所有行并调用回调函数。

## 示例

```javascript
// test.csv 文件的内容是
// "A,B,C,D\r\n
// 1,2,3,4\r\n
// a,b,c,d\r\n"
var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
csvReader.loopAllLines(callback,"\r\n");	// 函数 "callback" 将被执行三次

function callback(aryField, index) {
	...
};
```

## API

| 调用 | 返回值 |
|---|---|
| `csvReader. loopAllLines ( callback )` | `Array` |
| `csvReader. loopAllLines ( callback, CRLFCode )` | `Array` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `callback ( aryField, index )` | `Function` | 期望逐行执行的函数。<br>`aryField`: 数组数据。<br>`index`: 行号，从 0 开始计数。 |
| `CRLFCode` | `String` | 定义换行符的代码。例如 `\r\n`、`\n` |