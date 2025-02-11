# file.list

`list` 函数用于检索文件或子文件夹信息的数组。

## 示例

```javascript
var infos = file.list("myFolder");
```

## API

| 调用 | 返回值 |
|---|---|
| `file. list ( path )` | `Array` of [`FileInfo`](file.FileInfo.md) |
| `file. list ( path, withoutFolderLength )` | `Array` of [`FileInfo`](file.FileInfo.md) |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储的文件夹的相对路径。 |
| `withoutFolderLength` | `Boolean` | 一个标志，指示是否计算子文件夹大小。默认值为 `false`。 |