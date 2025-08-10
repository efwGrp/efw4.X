# Result.preview

`preview` 函数可以从客户端浏览器预览服务器文件。

## 示例

```javascript
var result = new Result();
result.preview("my.pdf");
```

## API

| 调用 | 返回值 |
|---|---|
| `result. preview ( path )` | `Result` |
| `result. preview ( path , isAbs )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 文件路径。 |
| `isAbs` | `boolean` | 指示 `path` 是绝对路径还是相对路径（相对于存储位置）。 |
