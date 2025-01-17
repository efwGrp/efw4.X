<H1>any.format</H1>

The format function is established to format any value to String.
{any} = { Number | Date | Boolean | String }

<h2>Sample</h2>

```javascript
(12345).format("#,000.0");
(new Date()).format("yyyy/MM/dd");
//the enum format
true.format("{YES=true,NO=false}");
"ONE".format("{一=ONE,二=TWO,三=THREE}");
"1".format("{一=1,二=2,三=3}");
"1".format("{一='1',二='2',三='3'}");
"1".format('{一="1",二="2",三="3"}');
var a=1;a.format("{一=1,二=2,三=3}");
new Date("2025-01-01").format("{25Y=2025-01-01,24Y=2024-01-01}");
```

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

