<H1>cmd.execute</H1>

The execute function is established to invoke a program or system command.
If something wrong in the execution, CmdExecuteException will be thrown.
<h2>Sample</h2>
<pre>
	cmd.execute(["java","-version"]);
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>file . get ( params )</td><td>void</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>params</td><td>Array</td><td>An array to contain the command and parameters.</td></tr>
</table>
