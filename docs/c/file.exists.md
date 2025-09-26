# file.exists

`exists` 函数用于确定文件或文件夹是否存在。

## 示例

```javascript
var tf = file.exists("myFile.txt");
var tf = file.exists("myFolder");
```

## API

| 调用 | 返回值 |
|---|---|
| `file. exists ( path )` | `Boolean` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储的文件的相对路径或文件夹路径。 |