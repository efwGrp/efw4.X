<H1>brms.getRuleByAlias</H1>

The getRuleByAlias function is established to call a rule by name from the BRMS of <a href="https://www.escco.co.jp/innorules/">innorules</a>.
Its return is an instance of the Record class.
<h2>Sample</h2>
<pre>
	var record = brms.getRuleByAlias("ChineseFavorites", {
		"lessThan" : 30
	}).sort("years", "asc");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>brms . getRuleByAlias ( ruleAlias , params  )</td><td rowspan=2>Record</td></tr>
<tr><td>brms . getRuleByAlias ( ruleAlias , params , ruleDate )</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>ruleAlias</td><td>String</td><td>The alias of a rule stored in BRMS.</td></tr>
<tr><td>params</td><td>JSON Object</td>
<td>To send values which is requried by the rule. 
<pre>{"param1":value1,"param2":value2,...}</pre>
<tr><td>ruleDate</td><td>Date</td><td>The calling date. Default is the system date.</td></tr>
</table>

