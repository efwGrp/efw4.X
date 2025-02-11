# db._rollback

`_rollback` 函数用于回滚事务。默认情况下，它不需要显式调用。

## 示例

```javascript
try{
	db.change("TB1","deleteAll",{});
	db._commit();
}catch(e){
	db._rollback();
}
```

## API

| 调用 | 返回值 |
|---|---|
| `db. _rollback ( )` | `void` |
| `db. _rollback ( jdbcResourceName )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `jdbcResourceName` | `String` | 用于操作另一个数据库资源（非默认）的事务。 |