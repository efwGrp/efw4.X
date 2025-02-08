# db._commitAll

`_commitAll`関数は、すべてのデータベースリソースのすべてのトランザクションをコミットするために用意されています。デフォルトでは、明示的に呼び出す必要はありません。

## サンプル

```javascript
try{
    db.change("TB1","deleteAll",{},"jdbc/efw");
    db.change("TB2","deleteAll",{},"jdbc/car");
    db._commitAll();
}catch(e){
    db._rollbackAll();
}
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `db. _commitAll ( )` | `void` |