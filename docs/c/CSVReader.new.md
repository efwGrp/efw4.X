# new CSVReader

构造函数用于创建 `CSVReader` 对象。

## 示例

```javascript
// test.csv 文件的内容是
// "A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvReader = new CSVReader("input/test.txt", ",", "\"", "MS932");
```

## API

| 调用 | 返回值 |
|---|---|
| `new CSVReader ( path )` | `CSVReader` |
| `new CSVReader ( path, separator )` | `CSVReader` |
| `new CSVReader ( path, separator, delimiter )` | `CSVReader` |
| `new CSVReader ( path, separator, delimiter, encoding )` | `CSVReader` |
| `new CSVReader ( path, separator, delimiter, encoding, skipRows )` | `CSVReader` |
| `new CSVReader ( path, separator, delimiter, encoding, skipRows, rowsToRead )` | `CSVReader` |
| `new CSVReader ( path, separator, delimiter, encoding, skipRows, rowsToRead, offsetBytes, offsetRows )` | `CSVReader` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储文件夹的 CSV 文件路径。 |
| `separator` | `String` | CSV 文件的分隔符。默认值为 `,`。 |
| `delimiter` | `String` | CSV 文件的定界符。默认值为 `"`。 |
| `encoding` | `String` | CSV 文件的字符集名称。默认值为 UTF-8。 |
| `skipRows` | `Number` | 要跳过而不读取的行数。默认值为 -1 (未定义)。 |
| `rowsToRead` | `Number` | 要读取的行数。默认值为 -1 (未定义)。 |
| `offsetBytes` | `Number` | 在跳过行之前要偏移的字节数。默认值为 -1 (未定义)。您可以通过 `csvReader._offsetBytes` 获取当前位置。 |
| `offsetRows` | `Number` | 在跳过行之前要偏移的行数。默认值为 -1 (未定义)。您可以通过 `csvReader._offsetRows` 获取当前位置。 |