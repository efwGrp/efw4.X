<H1>mail.send</H1>

The send function is established to send mail by templates defined in the mail xml.

<h2>Sample</h2>
<pre>
	mail.send("mails","test01",{"to":"you@abc.def","nowdate":new Date(),"username":"Wang"});
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>mail . send ( groupId, mailId, params )</td><td>void</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>groupId</td><td>String</td><td>"SubFolder/FileName". SubFolder is relatived from efw.mail.folder. FileName is the name of a mail xml file.</td></tr>
<tr><td>mailId</td><td>String</td><td>The id of a mail tag in a mail xml file.</td></tr>
<tr><td>params</td><td>JSON Object</td>
<td>To send values which is requried by the mail defined in the mail xml file. 
<pre>{"param1":value1,"param2":value2,...}</pre>
</td></tr>
</table>

