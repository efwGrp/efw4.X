# Result.withdata

`withdata` 函数提供要与最近一次 `runat` 调用一起使用的数据。每个 `runat` 只能调用一次。在同一个 `runat` 中后续的调用无效。

## 示例

```javascript
var result = new Result();
result
.runat("#table1")
.remove("tr")
.append("<tr><td>{data1}</td><td>{{data2}}</td></tr>")
.withdata([
    {"data1":"hellworld1", "data2":"<span style='color:greed'>OK</span>"},
    {"data1":"hellworld2", "data2":"<span style='color:red'>NG</span>"},
])
.runat("body")
.withdata({
    "#text1":"good morning",
    "#text2":"good day"
});
```

## API

| 调用 | 返回值 |
|---|---|
| `result. withdata ( data )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `data` | `Array` 或 `Object` | 要在网页上显示的数据。<br> 如果与 `append` 函数一起使用，则 `withdata` 参数*必须*是一个数组。否则，它可以是一个对象。 |

`data` 的示例。

```javascript
// 作为数组
[{maskkey1: value1, maskkey2: value2 ...},{...}]

// 作为对象
{selector1: value1, selector2: value2 }
```