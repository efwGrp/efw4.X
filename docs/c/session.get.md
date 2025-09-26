# session.get

`get` 函数从当前会话中检索数据。

## 示例

```javascript
var userId = session.get("USER_ID");
```

## API

| 调用 | 返回值 |
|---|---|
| `session. get ( key )` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... |

| 参数 | 类型 | 描述 |
|---|---|---|
| `key` | `String` | 用于标识会话信息的键。 |