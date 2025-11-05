# context.get

`get` 函数从上下文中检索数据。

## 示例

```javascript
var userId = context.get("BROADCAST_CONTENT");
```

## API

| 调用 | 返回值 |
|---|---|
| `context. get ( key )` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... |

| 参数 | 类型 | 描述 |
|---|---|---|
| `key` | `String` | 用于标识上下文信息的键。 |