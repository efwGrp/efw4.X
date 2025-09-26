# Result.remove

`remove` 函数从最近一次 `runat` 调用指定的元素中删除元素。每个 `runat` 只能调用一次。在同一个 `runat` 中后续的调用无效。

## 示例

```javascript
var result = new Result();
result
.runat("#table1")
.remove("tr");
```

## API

| 调用 | 返回值 |
|---|---|
| `result. remove ( selector )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `selector` | `String` | 一个 jQuery 选择器，用于标识要删除的元素。 |