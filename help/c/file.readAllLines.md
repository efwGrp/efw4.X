# file.readAllLines

`readAllLines` 函数用于从文本文件中读取所有行。

## 示例

```javascript
var txt = file.readAllLines("myFolder/myFile.txt");
var txt = file.readAllLines("myFolder/myFile.txt", "UTF-8");
```

## API

| 调用 | 返回值 |
|---|---|
| `file. readAllLines ( path )` | `String` |
| `file. readAllLines ( path, encoding )` | `String` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 存储文件夹中相对的文本文件路径。 |
| `encoding` | `String` | 文本文件的字符集名称。默认值为 UTF-8。 |