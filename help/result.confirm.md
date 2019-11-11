<H1>Result.confirm</H1>

The confirm function is established to show a confirm dialog.
It can be called as far as once. The second calling is invalidated without any exceptions.
But if with alert, the alert message will be added in the confirm dialog before the confirm message.

<h2>Sample</h2>
<pre>
	var result = new Result();
	result.confirm("Let's do it,OK?" ,{"OK":"window.location='doit.jsp';","CANCEL":null});
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Result . confirm ( message , buttons )</td><td>Result</td></tr>
<tr><td>Result . confirm ( message , buttons , params )</td><td>Result</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>message</td><td>String</td><td>The information to show at the confirm dialog.
<pre>
	xxxx{param1}yyy{param2}yy
</pre>
You can define "{param}" in the message, it will be replaced by the params.
</td></tr>
<tr><td>buttons</td><td>Object</td><td>To define the buttons and the click actions.
<pre>
	{buttonName1:script1, buttonName2:script2}
</pre>
The script will be run at client after the button is clicked.
</td></tr>
<tr><td>params</td><td>Object</td><td>The params to replace "{param}" in the message.
<pre>
{
	param1:value1,
	param2:value2
}
</pre>
</td></tr>

</table>

