# Batch.log

`log` 函数用于将消息保存到批处理日志文件。

## 示例

```javascript
var batch = new Batch();
batch.log("早上好！").log("晚安！");
```

## API

| 调用 | 返回值 |
|---|---|
| `batch. log ( message )` | `Batch` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `message` | `String` | 要保存到日志文件的信息。 |