<H1>Result.eval</H1>

The eval function is established to run a script at the web.
It can be called more than once.

<h2>Sample</h2>
<pre>
	var result = new Result();
	result
	.eval("$('#table1 tr:even').css('background-color','green');")
	.eval("$('#table1 tr:odd').css('background-color','yellow');");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Result . eval ( script )</td><td>Result</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>script</td><td>String</td><td>The script will be run at the web.</td></tr>
</table>

