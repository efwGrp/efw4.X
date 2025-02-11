# new TXTReader

构造函数创建一个 `TXTReader` 对象。

## 示例

```javascript
// test.txt 文件的内容是：
// 12345678901234567890
// 11111222223333344444
// 99999777777777722222

var regFieldsDef = "(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932");

// test.txt 文件的内容是：
// 123456789012345678901111122222333334444499999777777777722222

var txtReader2 = new TXTReader("input/test.txt", regFieldsDef, "MS932", 20);
```

## API

| 调用 | 返回值 |
|---|---|
| `new TXTReader ( path, regFieldsDef )` | `TXTReader` |
| `new TXTReader ( path, regFieldsDef, encoding )` | `TXTReader` |
| `new TXTReader ( path, regFieldsDef, encoding, rowSize )` | `TXTReader` |
| `new TXTReader ( path, regFieldsDef, encoding, rowSize, skipRows )` | `TXTReader` |
| `new TXTReader ( path, regFieldsDef, encoding, rowSize, skipRows, rowsToRead )` | `TXTReader` |

## 参数

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 文件或文件夹的相对路径。 |
| `regFieldsDef` | `String` | 定义要提取字段的正则表达式。 |
| `encoding` | `String` | 文本文件的字符集编码。默认值为 UTF-8。 |
| `rowSize` | `Number` | 记录的大小（以字节为单位）。默认值为 -1（未定义）。 |
| `skipRows` | `Number` | 读取前要跳过的行数。默认值为 -1（未定义）。 |
| `rowsToRead` | `Number` | 要读取的行数。默认值为 -1（未定义）。 |