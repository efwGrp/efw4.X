<H1>db.master</H1>

The master function is established to store the data from a master table into the memory.
Its return is an instance of the <a href="record.md">Record</a> class.
The first calling to a master means to load it into the memory, and the second calling means to get records from memory.
<h2>Sample for Event</h2>
<pre>
	var record1 = db.master("user").sort("years", "asc");
	var record2 = db.master("user", true);
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>db . master ( masterId )</td><td rowspan=4><a href="record.md">Record</a></td></tr>
<tr><td>db . master ( masterId , reload )</td></tr>
<tr><td>db . master ( masterId , jdbcResourceName )</td></tr>
<tr><td>db . master ( masterId , reload, jdbcResourceName )</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>masterId</td><td>String</td><td>The name of a master table.</td></tr>
<tr><td>reload</td><td>Boolean</td><td>The flag to load the master again event it has been loaded.</td></tr>
<tr><td>jdbcResourceName</td><td>String</td><td>To execute SQL in another database resource, but not the default. 
</td></tr>
</table>

