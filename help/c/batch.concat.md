# Batch.concat

`concat` 函数用于将一个批处理结果连接到另一个批处理结果。

## 示例

```javascript
var batch = new Batch();
var batch1 = new Batch();
batch.concat(batch1);
```

## API

| 调用 | 返回值 |
|---|---|
| `batch. concat ( batch )` | `Batch` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `batch` | `Batch` | 子批处理结果。 |
