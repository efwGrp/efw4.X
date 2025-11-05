# context.set

`set` 函数将数据存储在上下文中。

## 示例

```javascript
context.set("BROADCAST_CONTENT", "hello the time is "
	+new Date().format("yyyy/MM/dd HH:mm:ss"));
```
## API

| 调用 | 返回值 |
|---|---|
| `context. set ( key, value )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `key` | `String` | 用于标识上下文信息的键。 |
| `value` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... | 要存储在上下文中的信息。 |