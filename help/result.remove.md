<H1>Result.remove</H1>

The remove function is established to create the remove attribute to the last return value.
It can be called as far as once to a runat. The second calling is invalidated without any exceptions.

<h2>Sample</h2>
<pre>
	var result = new Result();
	result
	.runat("#table1")
	.remove("tr");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Result . remove ( selector )</td><td>Result</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>selector</td><td>String</td><td>A jQuery selector key to mark the tags which will be deleted.</td></tr>
</table>

