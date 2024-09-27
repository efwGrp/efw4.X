<H1>Math.ROUNDDOWN</H1>

The ROUNDDOWN function is established to round a number just like the same name excel function. 
<h2>Sample</h2>

```javascript
Math.ROUNDDOWN(5.5,0);		//5
Math.ROUNDDOWN(2.5,0);		//2
Math.ROUNDDOWN(1.6,0);		//1
Math.ROUNDDOWN(1.1,0);		//1
Math.ROUNDDOWN(1.0,0);		//1
Math.ROUNDDOWN(-1.0,0);		//-1
Math.ROUNDDOWN(-1.1,0);		//-1
Math.ROUNDDOWN(-1.6,0);		//-1
Math.ROUNDDOWN(-2.5,0);		//-2
Math.ROUNDDOWN(-5.5,0);		//-5

Math.ROUNDDOWN(1.2345,3);	//1.234
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Math.ROUNDDOWN ( num, digit )</td><td>Number</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>num</td><td>Number</td><td>The number to round.</td></tr>
<tr><td>digit</td><td>Number</td><td>Number of digits after the decimal point.</td></tr>
</table>