# db.select

`select` 函数用于执行 SELECT SQL。其返回值是 `Record` 类的实例。

## 示例

```javascript
var record1 = db.select("helloWorld", "selectUser", {
	"country" : "China"
}).sort("years", "asc");
var record2 = db
	.select("select * from table_user where country='China' order years asc");
```

## API

| 调用 | 返回值 |
|---|---|
| `db. select ( groupId, sqlId, params )` | [`Record`](record.md) |
| `db. select ( groupId, sqlId, params, jdbcResourceName )` | [`Record`](record.md) |
| `db. select ( sql )` | [`Record`](record.md) |
| `db. select ( sql, jdbcResourceName )` | [`Record`](record.md) |

| 参数 | 类型 | 描述 |
|---|---|---|
| `groupId` | `String` | `"子文件夹/文件名"`。`子文件夹` 相对于 `efw.sql.folder`。`文件名` 是 SQL XML 文件的名称。 |
| `sqlId` | `String` | SQL XML 文件中 `sql` 标签的 ID。 |
| `params` | `JSON 对象` | 发送 SQL XML 文件中定义的 SQL 所需的值。<br>```{"param1":value1,"param2":value2,...}``` |
| `jdbcResourceName` | `String` | 在另一个数据库资源（非默认）中执行 SQL。 |
| `sql` | `String` | 执行纯 SQL 字符串。 |