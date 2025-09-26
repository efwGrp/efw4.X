# new BinaryWriter

构造函数用于创建 `BinaryWriter` 对象。

## Sample

```javascript
//输出文件 test.txt 的内容是
//"123456789012345678901111122222333334444499999777777777722222"
var binaryWriter = new BinaryWriter("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
```

## API

| 调用 | 返回值 |
|---|---|
| `new BinaryWriter ( path, aryFieldsDef, aryEncoding, rowSize )` | `BinaryWriter` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储文件夹的 CSV 文件路径。|
| `aryFieldsDef` | `Array` | 定义所有字段长度的数组。 |
| `aryEncoding` | `Array` | 定义所有字段字符集名称的数组。|
| `rowSize` | `Number` | 记录的二进制大小。|
