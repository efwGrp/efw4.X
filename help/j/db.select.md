# db.select

`select`関数は、SELECT SQLを実行するために用意されています。その戻り値は`Record`クラスのインスタンスです。

## サンプル

```javascript
var record1 = db.select("helloWorld", "selectUser", {
	"country" : "China"
}).sort("years", "asc");
var record2 = db
	.select("select * from table_user where country='China' order years asc");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `db. select ( groupId, sqlId, params )` | `Record` |
| `db. select ( groupId, sqlId, params, jdbcResourceName )` | `Record` |
| `db. select ( sql )` | `Record` |
| `db. select ( sql, jdbcResourceName )` | `Record` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `groupId` | `String` | `"サブフォルダ/ファイル名"`。`サブフォルダ`は`efw.sql.folder`からの相対パスです。`ファイル名`はSQL XMLファイルの名前です。 |
| `sqlId` | `String` | SQL XMLファイル内の`sql`タグのID。 |
| `params` | `JSON Object` | SQL XMLファイルで定義されたSQLに必要な値を送信します。<br>```{"param1":value1,"param2":value2,...}``` |
| `jdbcResourceName` | `String` | デフォルトではなく、別のデータベースリソースでSQLを実行する場合に使用します。 |
| `sql` | `String` | 純粋なSQL文字列を実行します。 |