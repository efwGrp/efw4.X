# Record.map

`map` 函数转换 `Record` 对象中数组数据的格式。

## 示例

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);

record.map({
    "A":"data1",
    "B":["data2","#,##0"],
    "C":["data3","yyyy/MM/dd"],
    "D":function(data){
        return data["data1"]+data["data2"]+data["data3"];
    }
});
```

## API

| 调用 | 返回值 |
|---|---|
| `record. map ( mapping )` | `Record` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `mapping` | `Object` | 新字段和现有字段之间的映射。<br>另请参阅：[formatter&rounder](formatter&rounder.md)。 |

`mapping` 的示例：

```javascript
{
    newField1: oldField1,
    newField2: [oldField2, "#,##0.0", "HALF_EVEN"], // 格式化器，舍入器
    newField3: function(data){return String|Number|Date|Boolean;}
}
```
