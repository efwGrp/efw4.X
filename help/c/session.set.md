# session.set

`set` 函数将数据存储在当前会话中。

## 示例

```javascript
session.set("USER_ID", "Wang");
```
## API

| 调用 | 返回值 |
|---|---|
| `session. set ( key, value )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `key` | `String` | 用于标识会话信息的键。 |
| `value` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... | 要存储在会话中的信息。 |