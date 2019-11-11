<H1>Properties File</H1>
the file /WEB-INF/classes/batch.properties is established to set the framework.
<table>
<tr>
	<th>Group</th>
	<th>Key</th>
	<th>Default Value</th>
	<th>Description</th>
</tr>
<tr>
	<th rowspan=3>Folder</th>
	<td>efw.event.folder</td>
	<td>/WEB-INF/efw/event</td>
	<td>The folder for web application events program. It can be set in a relative or absolute path of the web application.</td>
</tr>
<tr>
	<td>efw.sql.folder</td>
	<td>/WEB-INF/efw/sql</td>
	<td>The folder for web application outside sql. It can be set in a relative or absolute path of the web application.</td>
</tr>
<tr>
	<td>efw.storage.folder</td>
	<td>/WEB-INF/efw/<br>storage</td>
	<td>The folder for Web application IO. It can be set in a relative or absolute path of the web application.</td>
</tr>

<tr>
	<th rowspan=4>Database Resource</th>
	<td>efw.jdbc.resource[.n]</td>
	<td></td>
	<td>The default jdbc resource name. You can define multi by add [.n] . Example: jdbc/efw</td>
</tr>
<tr>
	<td>efw.jdbc.resource.url[.n]</td>
	<td></td>
	<td>Example: jdbc:postgresql://127.0.0.1:5432/efwSample</td>
</tr>
<tr>
	<td>efw.jdbc.resource.username[.n]</td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td>efw.jdbc.resource.password[.n]</td>
	<td></td>
	<td></td>
</tr>

<tr>
	<th rowspan=8>Mail Resource</th>
	<td>efw.mail.username</td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td>efw.mail.password</td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td>mail.user</td>
	<td></td>
	<td rowspan=6>Write the JavaMail properties here. If you need other property keys, see the following URLs.<br>
<a href="https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html">smtp api</a><br>
<a href="https://javaee.github.io/javamail/docs/api/com/sun/mail/pop3/package-summary.html">pop3 api</a><br>
<a href="https://javaee.github.io/javamail/docs/api/com/sun/mail/imap/package-summary.html">imap api</a><br>
</td>
</tr>
<tr>
	<td>mail.from</td>
	<td></td>
</tr>
<tr>
	<td>mail.transport.protocol</td>
	<td></td>
</tr>
<tr>
	<td>mail.smtp.host</td>
	<td></td>
</tr>
<tr>
	<td>mail.smtp.auth</td>
	<td></td>
</tr>
<tr>
	<td>mail.smtp.port</td>
	<td></td>
</tr>

<tr>
	<th>Logging</th>
	<td>efw.logging.level</td>
	<td>WARNING</td>
	<td>The output level of efw log. ALL,FINEST,FINER,FINE,CONFIG,INFO,WARNING,SEVERE,OFF</td>
</tr>
<tr>
	<th>Rounder</th>
	<td>efw.format.rounder</td>
	<td>HALF_EVEN</td>
	<td>The default rounder for format method. UP,DOWN,CEILING,FLOOR,HALF_UP,HALF_DOWN,HALF_EVEN</td>
</tr>


</table>
</DL></DD>
