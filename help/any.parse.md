<H1>any.parse</H1>

The parse function is established to parse String to Number or Date.
{any} = { Number | Date }

<h2>Sample</h2>

```javascript
	var nm = Number.parse("12,345.0", "#,000.0");
	var dt = Date.parse("2016/09/08", "yyyy/MM/dd");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>{any} . parse ( value , formatter )</td><td>String</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>value</td><td>String</td><td>The string value of Number or Date.</td></tr>
<tr><td>formatter</td><td>String</td><td>Number Formatter or Date Formatter</td></tr>
</table>

<table>
<tr><th>Number Formatter</th></tr>
<tr><td>0</td></tr>
<tr><td>#</td></tr>
<tr><td>,</td></tr>
<tr><td>.</td></tr>
<tr><td>%</td></tr>
</table>

<table>
<tr><th>Date Formatter</th></tr>
<tr><td>GGGGy</td><td>Japan WAREKI, 2016 -- 平成28</td></tr>
<tr><td>Gy</td><td>Japan WAREKI, 2016 -- H28</td></tr>
<tr><td>yyyy</td></tr>
<tr><td>yy</td></tr>
<tr><td>MM</td></tr>
<tr><td>M</td></tr>
<tr><td>dd</td></tr>
<tr><td>d</td></tr>
<tr><td>HH</td></tr>
<tr><td>H</td></tr>
<tr><td>mm</td></tr>
<tr><td>m</td></tr>
<tr><td>ss</td></tr>
<tr><td>s</td></tr>
<tr><td>SSS</td></tr>
<tr><td>S</td></tr>
</table>

