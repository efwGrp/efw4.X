<H1>db.select</H1>

The select function is established to execute SELECT SQL.
Its return is an instance of the Record class.

<h2>Sample</h2>
<pre>
	var record1 = db.select("helloWorld", "selectUser", {
		"country" : "China"
	}).sort("years", "asc");
	var record2 = db
			.select("select * from table_user where country='China' order years asc");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>db . select ( groupId , sqlId , params )</td><td rowspan=4>Record</td></tr>
<tr><td>db . select ( groupId , sqlId , params , jdbcResourceName )</td></tr>
<tr><td>db . select ( sql )</td></tr>
<tr><td>db . select ( sql , jdbcResourceName )</td></tr>
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
</td></tr>
<tr><td>sql</td><td>String</td><td>To execute a pure SQL string.</td></tr>
</table>

