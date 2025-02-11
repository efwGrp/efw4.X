# file.get

`get` 函数用于检索有关文件或文件夹的信息。

## 示例

```javascript
var infoFile = file.get("myFile.txt");
var infoFolder = file.get("myFolder");
```

## API

| 调用 | 返回值 |
|---|---|
| `file. get ( path )` | [`FileInfo`](file.FileInfo.md) |
| `file. get ( path, withoutFolderLength )` | [`FileInfo`](file.FileInfo.md) |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储的文件的相对路径或文件夹路径。 |
| `withoutFolderLength` | `Boolean` | 一个标志，指示是否计算文件夹大小。默认值为 `false`。 |