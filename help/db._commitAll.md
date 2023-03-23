<H1>db._commitAll</H1>

The _commitAll function is established to commit all transactions for all database resources.
As a default, it does not need to be called explicitly.
<h2>Sample</h2>
<pre>
	try{
		db.change("TB1","deleteAll",{},"jdbc/efw");
		db.change("TB2","deleteAll",{},"jdbc/car");
		db._commitAll();
	}catch(e){
		db._rollbackAll();
	}
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>db . _commitAll ( )</td><td>void</td></tr>
</table>

