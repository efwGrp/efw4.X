<H1>db._rollbackAll</H1>

The _rollbackAll function is established to rollback all transactions for all database resources.
As a default, it does not need to be called explicitly.
<h2>Sample</h2>

```javascript
try{
	db.change("TB1","deleteAll",{},"jdbc/efw");
	db.change("TB2","deleteAll",{},"jdbc/car");
	db._commitAll();
}catch(e){
	db._rollbackAll();
}
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>db . _rollbackAll ( )</td><td>void</td></tr>
</table>

