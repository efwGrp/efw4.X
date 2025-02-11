# Result.focus

`focus` 函数将焦点设置到客户端指定的元素。它只能被调用一次。

## 示例

```javascript
var result = new Result();
result.focus("#text1");
```

## API

| 调用 | 返回值 |
|---|---|
| `result. focus ( selector )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `selector` | `String` | 一个 jQuery 选择器，用于标识接收焦点的元素。 |