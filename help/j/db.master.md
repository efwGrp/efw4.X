# db.master

`master`関数は、マスターテーブルからデータをメモリに格納するために用意されています。その戻り値は[Record](record.md)クラスのインスタンスです。マスターテーブルへの最初の呼び出しでは、テーブルがメモリにロードされ、以降の呼び出しではメモリからレコードが取得されます。

## イベントのサンプル

```javascript
var record1 = db.master("user").sort("years", "asc");
var record2 = db.master("user", true);
```

## API

| Calling | Returning |
|---|---|
| `db. master ( masterId )` | [Record](record.md) |
| `db. master ( masterId, reload )` | [Record](record.md) |
| `db. master ( masterId, jdbcResourceName )` | [Record](record.md) |
| `db. master ( masterId, reload, jdbcResourceName )` | [Record](record.md) |

| Parameter | Type | Description |
|---|---|---|
| `masterId` | `String` | マスターテーブルの名前。 |
| `reload` | `Boolean` | マスターテーブルが既にロードされている場合でも、リロードするフラグ。 |
| `jdbcResourceName` | `String` | デフォルト以外のデータベースリソースでSQLを実行する場合。 |