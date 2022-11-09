<H1>Properties File</H1>
the file /WEB-INF/classes/efw.properties is established to set the framework. If everything is default, it is not needed.
<table>
<tr>
	<th>Group</th>
	<th>Key</th>
	<th>Default Value</th>
	<th>Description</th>
</tr>
<tr>
	<th>Run Mode</th>
	<td>efw.isdebug</td>
	<td>false</td>
	<td>If the value is true, any changing to the program will be loaded into memory in real time. </td>
</tr>
<tr>
	<th>Logging</th>
	<td>efw.logging.level</td>
	<td>WARNING</td>
	<td>The output level of efw log. ALL,FINEST,FINER,FINE,CONFIG,INFO,WARNING,SEVERE,OFF</td>
</tr>
<tr>
	<th>Database Resource</th>
	<td>efw.jdbc.resource</td>
	<td>jdbc/efw</td>
	<td>The default jdbc resource name, which must be defined in /META-INF/context.xml. If your server is not tomcat, you can define it by jndi name. Example: java:xxx/yyy/zzz  or  [java:comp/env/]jdbc/efw</td>
</tr>
<tr>
	<th>Mail</th>
	<td>efw.mail.resource</td>
	<td>mail/efw</td>
	<td>The default mail resource name, which must be defined in /META-INF/context.xml. If your server is not tomcat, you can define it by jndi name. Example: java:xxx/yyy/zzz  or  [java:comp/env/]mail/efw</td>
</tr>
<tr>
	<th rowspan=5>Folder</th>
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
	<td>efw.mail.folder</td>
	<td>/WEB-INF/efw/mail</td>
	<td>The folder for web application mail template. It can be set in a relative or absolute path of the web application.</td>
</tr>
<tr>
	<td>efw.i18n.folder</td>
	<td>/WEB-INF/efw/mail</td>
	<td>The folder for multi language properties. It can be set in a relative or absolute path of the web application.</td>
</tr>
<tr>
	<td>efw.storage.folder</td>
	<td>/WEB-INF/efw/<br>storage</td>
	<td>The folder for Web application IO. It can be set in a relative or absolute path of the web application.</td>
</tr>
<tr>
	<th>Rounder</th>
	<td>efw.format.rounder</td>
	<td>HALF_EVEN</td>
	<td>The default rounder for format method. UP,DOWN,CEILING,FLOOR,HALF_UP,HALF_DOWN,HALF_EVEN</td>
</tr>
<tr>
	<th>Cors</th>
	<td>efw.cors</td>
	<td>*</td>
	<td>Cross-domain communication settings. It controls whether the events of this site can be used from the Web page of the other sites.<br>
	* : Allow all, null : Reject all, http://0.0.0.0:8080,http://9.9.9.9 : Specified permission. </td>
</tr>

<tr>
	<th rowspan=6>Login Check<br>(for web event)</th>
	<td>efw.login.check</td>
	<td>false</td>
	<td>The flag indicating whether the web application does the login check.</td>
</tr>
<tr>
	<td>efw.login.key</td>
	<td>USER_ID</td>
	<td>The session key for login check. </td>
</tr>
<tr>
	<td>efw.login.url</td>
	<td>login.jsp</td>
	<td>The page to login.If any access without logining, this page will be shown.</td>
</tr>
<tr>
	<td>efw.outoflogin.<br>url.pattern</td>
	<td></td>
	<td>The regexp to set pages which are out of logining check. </td>
</tr>
<tr>
	<td>efw.outoflogin.<br>eventid.pattern</td>
	<td></td>
	<td>The regexp to set events which are out of logining check. </td>
</tr>
<tr>
	<td>efw.sso.enable</td>
	<td>false</td>
	<td>The flag indicating whether the web application does the sso authentication check. </td>
</tr>

<tr>
	<th rowspan=6>Auth Check<br>(for web event)</th>
	<td>efw.auth.check</td>
	<td>false</td>
	<td>The flag indicating whether the web application does the authority check.</td>
</tr>
<tr>
	<td>efw.auth.key</td>
	<td>USER_AUTH</td>
	<td>The session key for authority check. </td>
</tr>
<tr>
	<td>efw.system.error.<br>url</td>
	<td>error.jsp</td>
	<td>The page to show system error.</td>
</tr>
<tr>
	<td>efw.auth.cases</td>
	<td></td>
	<td>The authority cases splitted by [,] to define sets of authorities and pages. </td>
</tr>
<tr>
	<td>####.auth.pattern</td>
	<td></td>
	<td>The authority regexp of the set. </td>
</tr>
<tr>
	<td>####.url.pattern</td>
	<td></td>
	<td>The page regexp of the set. </td>
</tr>

<tr>
	<th>Application</th>
	<td>efw.as.main</td>
	<td>true</td>
	<td>The application will be running as a main application or a sub one.</td>
</tr>

<tr>
	<th rowspan=3>Properties For Main App</th>
	<td>efw.call.to.subs</td>
	<td></td>
	<td>The sub applications splitted by [,].</td>
</tr>
<tr>
	<td>####.appurl</td>
	<td></td>
	<td>The sub application url.</td>
</tr>
<tr>
	<td>####.encodekey</td>
	<td></td>
	<td>The encode key for sharing session to the sub application.</td>
</tr>

<tr>
	<th rowspan=3>Properties For Sub App</th>
	<td>efw.appurl</td>
	<td></td>
	<td>The appurl for the sub application.</td>
</tr>
<tr>
	<td>efw.decodekey</td>
	<td></td>
	<td>The decode key for the sub application to get sharing session from the main application.</td>
</tr>


</table>
</DL></DD>
