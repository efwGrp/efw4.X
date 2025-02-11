# Result.deleteAfterDownload

`deleteAfterDownload` 函数指定文件或文件夹在下载后应被删除。

## 示例

```javascript
var result = new Result();
result
.attach("test.xls")
.deleteAfterDownload();
```

## API

| 调用 | 返回值 |
|---|---|
| `result . deleteAfterDownload ( )` | `Result` |