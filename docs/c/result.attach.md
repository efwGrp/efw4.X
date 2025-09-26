# Result.attach

`attach` 函数允许下载文件或文件夹。

## 示例

```javascript
var result1 = (new Result())
.attach("test1.xls")
.attach("test2.xls");
var result2 = (new Result())
.attach("temp/test1.xls","temp")
.attach("temp/test2.xls","temp");
```

## API

| 调用 | 返回值 |
|---|---|
| `result. attach ( path )` | `Result` |
| `result. attach ( path, zipBasePath )` | `Result` |
| `result. attach ( path, zipBasePath, isAbs )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 文件或文件夹路径。 |
| `zipBasePath` | `String` | 用于创建下载的 zip 压缩文件的根路径。 |
| `isAbs` | `boolean` | 指示 `path` 是绝对路径还是相对路径（相对于存储位置）。 |
