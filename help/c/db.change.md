# db.change

`change` 函数用于执行 INSERT、UPDATE 或 DELETE SQL 语句。返回值是修改记录的计数。

## 示例

```javascript
db.change("helloWorld", "DeleteUser", {
	"country" : "China"
});
var count = db.change("delete * from table_user where country='China'");
```

## API

| 调用 | 返回值 |
|---|---|
| `db. change ( groupId, sqlId, params )` | `Number` |
| `db. change ( groupId, sqlId, params, jdbcResourceName )` | `Number` |
| `db. change ( sql )` | `Number` |
| `db. change ( sql, jdbcResourceName )` | `Number` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `groupId` | `String` | SQL XML 文件的名称。 |
| `sqlId` | `String` | SQL XML 文件中 `sql` 标签的 ID。 |
| `params` | `JSON 对象` | 发送 SQL XML 文件中定义的 SQL 所需的值。<br>```{"param1":value1,"param2":value2,...}``` |
| `jdbcResourceName` | `String` | 在另一个数据库资源（非默认）中执行 SQL。 |
| `sql` | `String` | 执行纯 SQL 字符串。 |