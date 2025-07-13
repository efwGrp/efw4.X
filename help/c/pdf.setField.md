# Pdf.setField

`setField` 函数用于在单元格中设置值、样式等。

## 示例

```javascript
var pdf = new Pdf("mytemplate.pdf");
pdf
.setField("field1","helloworld")
.save("my.pdf").close();
```

## API

| 调用 | 返回值 |
|---|---|
| `pdf. setField ( fieldName, fieldValue )` | `Pdf` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `fieldName` | `String` | 項目名. |
| `fieldValue` | `String` |  要设置到項目中的值。 |
