<H1>db._rollback</H1>

The _rollback function is established to rollback a transaction.
As a default, it does not need to be called explicitly.
<h2>Sample</h2>
<pre>
	try{
		db.change("TB1","deleteAll",{});
		db._commit();
	}catch(e){
		db._rollback();
	}
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>db . _rollback ( )</td><td>void</td></tr>
<tr><td>db . _rollback ( jdbcResourceName )</td><td>void</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>jdbcResourceName</td><td>String</td><td>To operate the transaction for another database resource, but not the default. 
</td></tr>
</table>

