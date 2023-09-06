<H1>db._commit</H1>

The _commit function is established to commit a transaction.
As a default, it does not need to be called explicitly.
<h2>Sample</h2>

```javascript
try{
	db.change("TB1","deleteAll",{});
	db._commit();
}catch(e){
	db._rollback();
}
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>db . _commit ( )</td><td>void</td></tr>
<tr><td>db . _commit ( jdbcResourceName )</td><td>void</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>jdbcResourceName</td><td>String</td><td>To operate the transaction for another database resource, but not the default. 
</td></tr>
</table>

