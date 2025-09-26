# db.master

`master` 函数用于将主表中的数据存储到内存中。其返回值是 [Record](record.md) 类的实例。首次调用主表时，会将其加载到内存中，后续调用则从内存中检索记录。

## Event 示例

```javascript
var record1 = db.master("user").sort("years", "asc");
var record2 = db.master("user", true);
```

## API

| 调用 | 返回值 |
|---|---|
| `db. master ( masterId )` | [`Record`](record.md) |
| `db. master ( masterId, reload )` | [`Record`](record.md) |
| `db. master ( masterId, jdbcResourceName )` | [`Record`](record.md) |
| `db. master ( masterId, reload, jdbcResourceName )` | [`Record`](record.md) |

| 参数 | 类型 | 描述 |
|---|---|---|
| `masterId` | `String` | 主表的名称。 |
| `reload` | `Boolean` | 重新加载主表的标志，即使它已经被加载。 |
| `jdbcResourceName` | `String` | 在另一个数据库资源（非默认）中执行 SQL。 |