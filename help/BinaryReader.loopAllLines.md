<H1>BinaryReader.loopAllLines</H1>

The function to loop all lines for the callback function calling.

<h2>Sample</h2>
<pre>
	//The content of the test.txt file is 
	//"123456789012345678901111122222333334444499999777777777722222"
	var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20); 
	binaryReader.loopAllLines(callback);	// The function "callback" will be executed three times

	function callback(aryField, index) {
		...
	};
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>BinaryReader . loopAllLines(callback)</td><td>Array</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>callback(aryField, index)</td><td>Function</td>
	<td>The function that is expected to execute line-by-line.
	<pre>aryField : The array data.<br>index : The line number which counts from 0.</pre>
	</td></tr>
		
		
</table>
