<H1>Math.ROUNDUP</H1>

The ROUNDUP function is established to round a number just like the same name excel function. 
<h2>Sample</h2>

```javascript
Math.ROUNDUP(5.5,0);		//6
Math.ROUNDUP(2.5,0);		//3
Math.ROUNDUP(1.6,0);		//2
Math.ROUNDUP(1.1,0);		//2
Math.ROUNDUP(1.0,0);		//1
Math.ROUNDUP(-1.0,0);		//-1
Math.ROUNDUP(-1.1,0);		//-2
Math.ROUNDUP(-1.6,0);		//-2
Math.ROUNDUP(-2.5,0);		//-3
Math.ROUNDUP(-5.5,0);		//-6

Math.ROUNDUP(1.2345,3);		//1.235
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Math.ROUNDUP ( num, digit )</td><td>Number</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>num</td><td>Number</td><td>The number to round.</td></tr>
<tr><td>digit</td><td>Number</td><td>Number of digits after the decimal point.</td></tr>
</table>