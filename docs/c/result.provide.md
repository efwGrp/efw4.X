# Result.provide

`provide` 函数向客户端发送数据以提供 Efw 函数的返回值。

## 示例

```javascript
var result = new Result();
result.provide({a:1,b:2});
```

## API

| 调用 | 返回值 |
|---|---|
| `result. provide ( data )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `data` | `String \| Number \| Boolean \| Date \| Object \| Array` | 您想要发送给客户端的信息。 |
