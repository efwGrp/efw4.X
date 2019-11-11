<H1>any.debug</H1>

The debug function is established to print information of any objects to the console.
{ any } = { String | Number | Boolean | Date | Array | Function | Object | Record | Result }
<h2>Sample</h2>
<pre>
	"hello world!".debug("test1");
	(123).debug("test1");
	(true).debug("test1");
	(new Date()).debug("test2");

	return (new Result()).runat().withData({
		"#userId" : "Wang"
	}.debug("test3")).debug("test4");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>{any} . debug ( label )</td><td>{any}</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>label</td><td>String</td><td>The label printed before the debugging info.</td></tr>
</table>

