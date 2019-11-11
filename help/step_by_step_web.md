<H1>Step by Step to Build a Running Environment</H1>

<h2>Prerequisites</h2>
<table>
<tr>
	<th>Item</th><th>Description</th><th>Notes</th>
</tr>
<tr>
	<td>JDK</td>
	<td>java JDK 1.8 or later.</td>
	<td>Java JDK is defferent in javascript engines to Open JDK.<br>
		Please check your JDK for Nashorn or GraalVM.
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
	<td>IE11, FireFox, Chrome, Edge, etc.</td>
	<td>All browsers that can use jQuery v3.4.1. <br>
		*If you want to use cors, please check the url. 
		http://caniuse.com/#feat=cors
	</td>
</tr>
</table>
<h2>Steps</h2>
<table>
<tr>
	<th>Step</th><th>Description</th><th>Notes</th>
</tr>
<tr>
	<td>JDK and Tomcat</td>
	<td>See the prerequisites.
	</td><td></td>
</tr>
<tr>
	<td>PostgreSQL</td>
	<td>1. Download version 9.3 or later and install it. https://www.postgresql.org/download/<br>
		2. Create a database named "efwSample". </td>
	<td>The sample database is created by version 9.3 and named as "efwSample". </td>
</tr>
<tr>
	<td>Sample DB</td>
	<td>1. Download the sample DB from the url: /release with sample/sample database/<br>
		2. Restore it in your PostgreSQL. 
	</td>
	<td></td>
</tr>
<tr>
	<td>Sample App</td>
	<td>1. Download the sample app from the url: /release with sample/web application/<br>
		2. Copy the app into the folder of Tomcat/webapps/efw . 
	</td>
	<td></td>
</tr>
<tr>
	<td>DB Connection</td>
	<td>1. Open the file of efw/META-INF/context.xml to modify user name and password in the resource of jdbc/efw.</td>
	<td>The jdbc driver for postgresSQL is included in the sample app.</td>
</tr>
<tr>
	<td>Java Mail</td>
	<td>1. Download the JavaMail jar from the url: /release with sample/tomcat lib/<br>
		2. Copy the JavaMail jar into the folder of Tomcat/lib .
		3. Open the file of efw/META-INF/context.xml to modify the resource of mail/efw.</td>
	<td>The JavaMail jar must be put in the tomcat lib folder, or it will be wrong.</td>
</tr>

<tr>
	<td>Properties</td>
	<td>1. Open the file of efw/WEB-INF/classes/efw.properties to modify it.<br>
		2. Set true to efw.isdebug.<br>
		3. Set ALL to efw.logging.level.
	</td>
	<td></td>
</tr>
<tr>
	<td>Start Up</td>
	<td>1. Start up Tomcat.<br>
		2. Open the login page. http://localhost:8080/efw/login.jsp </td><td></td>
</tr>
</table>




