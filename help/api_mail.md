<H1>Mail XML</H1>

<pre>
mails.xml
------------------------------------
&lt;?xml version="1.0" encoding="UTF-8"?>
&lt;!DOCTYPE mails>
&lt;mails>
	&lt;mail id="mail1">
		&lt;to>:to&lt;/to>
		&lt;cc>&lt;/cc>
		&lt;bcc>&lt;/bcc>
		&lt;mdn>&lt;/mdn>
		&lt;subject>About :about &lt;/subject>
		&lt;body>
Mr. :userName
...
		&lt;/body>
	&lt;/mail>
	&lt;mail id="mail2">
	...
	&lt;/mail>
&lt;/mails>
</pre>


<h3>Mail ID</h3>
Every Mail tag should have an Id. The Id must be unique in the Mail XML file.
It will be called by <a href="mail.send.md">mail.send</a>.

<h3>Param</h3>
You can define params in TO CC BCC MDN SUBJECT BODY just write :param .
The mdn tag means "Disposition-Notification-To".

<h4>Encode</h3>
Pay attention to the mark "&lt;". You must write it like "&amp;lt;" to match the xml diction.