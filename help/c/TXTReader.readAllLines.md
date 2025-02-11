# TXTReader.readAllLines

`readAllLines` 函数将文本文件中的所有行读取到一个数组矩阵中。

## 示例

```javascript
// test.txt 文件的内容是：
// 12345678901234567890
// 11111222223333344444
// 99999777777777722222

var regFieldsDef = "(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932");
var array = txtReader.readAllLines();

// 返回的数组是：
// [
//   ["12345", "6789012345", "67890"],
//   ["11111", "2222233333", "44444"],
//   ["99999", "7777777777", "22222"]
// ]
```

## API

| 调用 | 返回值 |
|---|---|
| `txtReader. readAllLines ( )` | `Array` |