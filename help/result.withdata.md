<H1>Result.withdata</H1>

The withdata function is established to create the withdata attribute to the last return value.
It can be called as far as once to a runat. The second calling is invalidated without any exceptions.

<h2>Sample</h2>
<pre>
	var result = new Result();
	result
	.runat("#table1")
	.remove("tr")
	.append("&lt;tr>&lt;td>{data1}&lt;/td>&lt;td>{{data2}}<&lt;/td>&lt;/tr>")
	.withdata([
		{"data1":"hellworld1", "data2":"&lt;span style='color:greed'>OK&lt;/span>"},
		{"data1":"hellworld2", "data2":"&lt;span style='color:red'>NG&lt;/span>"},
	])
	.runat("body")
	.withdata(
		{ "#text1":"good morning","#text2":"good day" }
	);
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Result . withdata ( data )</td><td>Result</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>data</td><td>Array|Object</td><td>The data which will be shown at the web.<br>
Tf with the append attribute, the withdata attribute must be an array. Or it can be an object.
<pre>

//as an array
[{maskkey1:value1, maskkey2]:value2 ...},{...}]

//as an object
{selector1:value1, selector2:value2 }

</pre>
</td></tr>
</table>

