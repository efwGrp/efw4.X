# TXTReader.loopAllLines

`loopAllLines` 函数遍历文本文件中的所有行，并为每一行调用一个回调函数。

## 示例

```javascript
// test.txt 文件的内容是：
// 12345678901234567890
// 11111222223333344444
// 99999777777777722222

var regFieldsDef = "(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932");
txtReader.loopAllLines(callback); // 回调函数将执行三次。

function callback(aryField, index) {
 // ... 你的代码 ...
}
```

## API

| 调用 | 返回值 |
|---|---|
| `txtReader. loopAllLines ( callback )` | `void` |

## 参数

| 参数 | 类型 | 描述 |
|---|---|---|
| `callback ( aryField, index )` | `Function` |  为每一行执行的函数。<br>`aryField`: 当前行的字段值数组。<br>`index`: 行号（从 0 开始）。 |
