<H1>rest.getStatus</H1>

The getStatus function is established to get the http status after calling a restAPI.
Its return is an integer number.
<h2>Sample</h2>
<pre>
	var ret = rest.get("http://localhost:8080/restSample/efwRestAPI/customer/u001");
	// {"id":"u001","nm":"customer name"}
	var status = rest.getStatus();
	// 200
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>rest . getStatus ( )</td><td>number</td></tr>
</table>


