<H1>Math.ROUND</H1>

The ROUND function is established to round a number just like the same name excel function. 
<h2>Sample</h2>

```javascript
Math.ROUND(5.5,0);		//6
Math.ROUND(2.5,0);		//3
Math.ROUND(1.6,0);		//2
Math.ROUND(1.1,0);		//1
Math.ROUND(1.0,0);		//1
Math.ROUND(-1.0,0);		//-1
Math.ROUND(-1.1,0);		//-1
Math.ROUND(-1.6,0);		//-2
Math.ROUND(-2.5,0);		//-3
Math.ROUND(-5.5,0);		//-6

Math.ROUND(1.2345,3);		//1.235
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Math.ROUND ( num, digit )</td><td>Number</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>num</td><td>Number</td><td>The number to round.</td></tr>
<tr><td>digit</td><td>Number</td><td>Number of digits after the decimal point.</td></tr>
</table>