# Excel.close

`close` 函数用于关闭 Excel 对象。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.save("my.xlsx").close();		// test.xlsx 和 my.xlsx 都将被保留。
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. close ( )` | `void` |