# Result.concat

`concat` 函数将当前结果与另一个 `Result` 对象连接起来。

## 示例

```javascript
var result = new Result();
result.concat(event.fire("subEvent"));
```

## API

| 调用 | 返回值 |
|---|---|
| `result. concat ( result )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `result` | `Result` | 要连接的另一个 `Result` 对象。 |