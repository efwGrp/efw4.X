# db.change

The `change` function is established to execute INSERT, UPDATE, or DELETE SQL statements. The return value is the count of modified records.

## Sample

```javascript
db.change("helloWorld", "DeleteUser", {
	"country" : "China"
});
var count = db.change("delete * from table_user where country='China'");
```

## API

| Calling | Returning |
|---|---|
| `db.change(groupId, sqlId, params)` | `Number` |
| `db.change(groupId, sqlId, params, jdbcResourceName)` | `Number` |
| `db.change(sql)` | `Number` |
| `db.change(sql, jdbcResourceName)` | `Number` |

| Parameters | Type | Description |
|---|---|---|
| `groupId` | `String` | The name of a SQL XML file. |
| `sqlId` | `String` | The ID of a `sql` tag in a SQL XML file. |
| `params` | `JSON Object` | To send values which are required by the SQL defined in the SQL XML file.<br>```{"param1":value1,"param2":value2,...}``` |
| `jdbcResourceName` | `String` | To execute SQL in another database resource, not the default. |
| `sql` | `String` | To execute a pure SQL string. |
