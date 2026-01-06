# new BinaryReader

构造函数用于创建 BinaryReader 对象。

## 示例

```javascript
//test.txt 文件的内容是
//"123456789012345678901111122222333334444499999777777777722222"
var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
```

## API

| 调用 | 返回值 |
|---|---|
| `new BinaryReader ( path, aryFieldsDef, aryEncoding, rowSize )` | `binaryReader` |
| `new BinaryReader ( path, aryFieldsDef, aryEncoding, rowSize, skipRows )` | `binaryReader` |
| `new BinaryReader ( path, aryFieldsDef, aryEncoding, rowSize, skipRows, rowsToRead )` | `binaryReader` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储的文件的或文件夹路径。 |
| `aryFieldsDef` | `Array` | 定义所有字段长度的数组。 |
| `aryEncoding` | `Array` | 定义所有字段字符集名称的数组。 |
| `rowSize` | `Number` | 记录的二进制大小。 |
| `skipRows` | `Number` | 要跳过而不读取的行数。默认值为 -1 表示未定义。 |
| `rowsToRead` | `Number` | 要读取的行数。默认值为 -1 表示未定义。 |