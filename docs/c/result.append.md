# Result.append

`append` 函数将内容添加到最近一次 `runat` 调用指定的元素中。每个 `runat` 只能调用一次。在同一个 `runat` 中后续的调用无效。

## 示例

```javascript
var result = new Result();
result
.runat("#table1")
.remove("tr")
.append("<tr><td>{data1}</td><td>{{data2}}</td></tr>");
```

## API

| 调用 | 返回值 |
|---|---|
| `result. append ( mask )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `mask` | `String` | 带有数据占位符的 HTML 代码片段，将替换已删除的标记。示例：<br> ```<tr><td>{data1}</td><td>{{data2}}</td></tr>```<br> `{data1}` 将被替换并使用 `data1` 字段的值进行 HTML 编码。`{{field}}` 将被替换，但*不会*进行 HTML 编码。 |
