<H1>db.change</H1>

The change function is established to execute UPDATE or DELETE SQL.
The return is the count of modefied records.
<h2>Sample</h2>
<pre>
	db.change("helloWorld", "DeleteUser", {
		"country" : "China"
	});
	var count = db.change("delete * from table_user where country='China'");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>db . change ( groupId , sqlId , params )</td><td rowspan=4>Number</td></tr>
<tr><td>db . change ( groupId , sqlId , params , jdbcResourceName )</td></tr>
<tr><td>db . change ( sql )</td></tr>
<tr><td>db . change ( sql , jdbcResourceName )</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>groupId</td><td>String</td><td>"SubFolder/FileName". SubFolder is relatived from efw.sql.folder. FileName is the name of a SQL xml file.</td></tr>
<tr><td>sqlId</td><td>String</td><td>The id of a sql tag in a SQL xml file.</td></tr>
<tr><td>params</td><td>JSON Object</td>
<td>To send values which is requried by the SQL defined in the SQL xml file. 
<pre>{"param1":value1,"param2":value2,...}</pre>
</td></tr>
<tr><td>jdbcResourceName</td><td>String</td><td>To execute SQL in another database resource, but not the default. 
<br>For efw-4iAP, it is shared database id.
</td></tr>
<tr><td>sql</td><td>String</td><td>To execute a pure SQL string.</td></tr>
</table>

