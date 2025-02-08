# db.select

The `select` function is established to execute SELECT SQL. Its return is an instance of the `Record` class.

## Sample

```javascript
var record1 = db.select("helloWorld", "selectUser", {
	"country" : "China"
}).sort("years", "asc");
var record2 = db
	.select("select * from table_user where country='China' order years asc");
```

## API

| Calling | Returning |
|---|---|
| `db. select ( groupId, sqlId, params )` | `Record` |
| `db. select ( groupId, sqlId, params, jdbcResourceName )` | `Record` |
| `db. select ( sql )` | `Record` |
| `db. select ( sql, jdbcResourceName )` | `Record` |

| Parameters | Type | Description |
|---|---|---|
| `groupId` | `String` | `"SubFolder/FileName"`. `SubFolder` is relative to `efw.sql.folder`. `FileName` is the name of a SQL XML file. |
| `sqlId` | `String` | The ID of a `sql` tag in a SQL XML file. |
| `params` | `JSON Object` | To send values which are required by the SQL defined in the SQL XML file.<br>```{"param1":value1,"param2":value2,...}``` |
| `jdbcResourceName` | `String` | To execute SQL in another database resource, not the default. |
| `sql` | `String` | To execute a pure SQL string. |

