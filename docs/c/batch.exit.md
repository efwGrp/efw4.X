# Batch.exit

`exit` 函数用于设置批处理执行的 ERRORLEVEL。

## 示例

```javascript
var batch = new Batch();
batch.exit(1);
```

## API

| 调用 | 返回值 |
|---|---|
| `batch. exit ( level )` | `Batch` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `level` | `Number` | ERRORLEVEL 的整数值。 |