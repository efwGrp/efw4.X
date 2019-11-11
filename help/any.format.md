<H1>any.format</H1>

The format function is established to format Number or Date to String.
{any} = { Number | Date }

<h2>Sample</h2>
<pre>
	(12345).format("#,000.0");
	(new Date()).format("yyyy/MM/dd");
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>{any} . format ( formatter )</td><td>String</td></tr>
<tr><td>{any} . format ( formatter , rounder )</td><td>String</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td><a href="formatter&rounder.md">formatter</a></td><td>String</td><td>Number formatter or date formatter.</td></tr>
<tr><td><a href="formatter&rounder.md">rounder</a></td><td>String</td><td>The rounder for number format.</td></tr>
</table>

