# db.change

`change`関数は、INSERT、UPDATE、またはDELETE SQL文を実行するために用意されています。戻り値は、変更されたレコード数です。

## サンプル

```javascript
db.change("helloWorld", "DeleteUser", {
    "country" : "China"
});
var count = db.change("delete * from table_user where country='China'");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `db. change ( groupId, sqlId, params )` | `Number` |
| `db. change ( groupId, sqlId, params, jdbcResourceName )` | `Number` |
| `db. change ( sql )` | `Number` |
| `db. change ( sql, jdbcResourceName )` | `Number` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `groupId` | `String` | SQL XMLファイルの名前。 |
| `sqlId` | `String` | SQL XMLファイル内の`sql`タグのID。 |
| `params` | `JSON Object` | SQL XMLファイルで定義されたSQLに必要な値を送信します。<br>```{"param1":value1,"param2":value2,...}``` |
| `jdbcResourceName` | `String` | デフォルトではなく、別のデータベースリソースでSQLを実行する場合に使用します。 |
| `sql` | `String` | 純粋なSQL文字列を実行します。 |