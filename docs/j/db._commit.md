# db._commit

`_commit`関数は、トランザクションをコミットするために用意されています。デフォルトでは、明示的に呼び出す必要はありません。

## サンプル

```javascript
try{
    db.change("TB1","deleteAll",{});
    db._commit();
}catch(e){
    db._rollback();
}
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `db. _commit ( )` | `void` |
| `db. _commit ( jdbcResourceName )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `jdbcResourceName` | `String` | デフォルトではなく、別のデータベースリソースのトランザクションを操作する場合に使用します。 |