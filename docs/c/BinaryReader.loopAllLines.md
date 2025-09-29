# BinaryReader.loopAllLines

该函数用于循环所有行并调用回调函数。

## 示例

```javascript
//test.txt 文件的内容是
//"123456789012345678901111122222333334444499999777777777722222"
var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
binaryReader.loopAllLines(callback);	// 函数 "callback" 将被执行三次

function callback(aryField, index) {
	...
};
```

## API

| 调用 | 返回值 |
|---|---|
| `binaryReader. loopAllLines ( callback )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `callback ( aryField, index )` | `Function` | 期望逐行执行的函数。<br> `aryField`: 数组数据。<br> `index`: 行号，从 0 开始计数。 |