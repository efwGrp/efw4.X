<H1>brms.getRuleById</H1>

The getRuleById function is established to call a rule by Id from the BRMS of <a href="https://www.escco.co.jp/innorules/">innorules</a>.
Its return is an instance of the Record class.
<h2>Sample</h2>

```javascript
	var record = brms.getRuleById("ChineseFavorites", {
		"lessThan" : 30
	}).sort("years", "asc");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>brms . getRuleById ( ruleId , params  )</td><td rowspan=2>Record</td></tr>
<tr><td>brms . getRuleById ( ruleId , params , ruleDate )</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>ruleId</td><td>String</td><td>The Id of a rule stored in BRMS.</td></tr>
<tr><td>params</td><td>JSON Object</td>
<td>To send values which is requried by the rule. 

```javascript
{"param1":value1,"param2":value2,...}
```

<tr><td>ruleDate</td><td>Date</td><td>The calling date. Default is the system date.</td></tr>
</table>

