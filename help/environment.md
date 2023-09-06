<H1>Environment</H1>

<table>
<tr>
	<th>Item</th><th>Description</th><th>Notes</th>
</tr>
<tr>
	<td>JDK</td>
	<td>java JDK 1.8 or later.</td>
	<td>Java JDK is defferent in javascript engines to Open JDK.<br>
		Please check your JDK for Nashorn <s>or GraalVM</s>.
	</td>
</tr>
<tr>
	<td>Application Server</td>
	<td>Tomcat 9 is recommended, 
		Or anything else which supports Servlet 3.X or later.<br>
		*A url for reference. 
		http://tomcat.apache.org/whichversion.html
	</td>
	<td>It is troublesome without Servlet 3.X, 
		because you must modify web.xml to add servlet defines.
	</td>
</tr>
<tr>
	<td>Browsers</td>
	<td><s>IE11</s>, FireFox, Chrome, Edge, etc.</td>
	<td>All browsers that can use jQuery v3.7.0. <br>
		*If you want to use cors, please check the url. 
		http://caniuse.com/#feat=cors
	</td>
</tr>
</table>




