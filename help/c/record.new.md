# new Record

构造函数创建一个新的 `Record` 对象。

## 示例

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
```

## API

| 调用 | 返回值 |
|---|---|
| `new Record ( array )` | `Record` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `array` | `Array` | 数组数据。 |