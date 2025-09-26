# db._rollbackAll

`_rollbackAll` 函数用于回滚所有数据库资源的所有事务。默认情况下，它不需要显式调用。

## 示例

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

| 调用 | 返回值 |
|---|---|
| `db. _rollbackAll ( )` | `void` |