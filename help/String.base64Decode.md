<H1>String.base64Decode</H1>

The base64Decode function is established to decode a encoded String by base64. 
This function is powered by <a href="https://github.com/dankogai/js-base64">base64</a>.
<h2>Sample</h2>
<pre>
	var value;
	value=("A=B B=C C=D".base64Encode());//value="QT1CIEI9QyBDPUQ=";
	value=value.base64Decode();//value="A=B B=C C=D"

	value=("A=B B=C C=D".base64EncodeURI());//value="QT1CIEI9QyBDPUQ";
	value=value.base64Decode();//value="A=B B=C C=D"
	
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>{String} . base64Decode ( )</td><td>{String}</td></tr>
</table>
