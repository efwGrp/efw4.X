# new CSVWriter

构造函数用于创建 `CSVWriter` 对象。

## 示例

```javascript
// test.csv 文件的内容是
// "A,B,C,D
// 1,2,3,4
// a,b,c,d"
var csvWriter = new CSVWriter("input/test.txt", ",", "\"", "MS932");
```

## API

| 调用 | 返回值 |
|---|---|
| `new CSVWriter ( path )` | `CSVWriter` |
| `new CSVWriter ( path, separator )` | `CSVWriter` |
| `new CSVWriter ( path, separator, delimiter )` | `CSVWriter` |
| `new CSVWriter ( path, separator, delimiter, encoding )` | `CSVWriter` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储文件夹的 CSV 文件路径。 |
| `separator` | `String` | CSV 文件的分隔符。默认值为 `,`。 |
| `delimiter` | `String` | CSV 文件的定界符。默认值为 `"`。 |
| `encoding` | `String` | CSV 文件的字符集名称。默认值为 UTF-8。 |