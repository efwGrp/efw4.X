<H1>Mail XML</H1>

mails.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mails>
<mails>
	<mail id="mail1">
		<to>:to</to>
		<cc></cc>
		<bcc></bcc>
		<mdn></mdn>
		<subject>About :about </subject>
		<body>
Mr. :userName
...
		</body>
	</mail>
	<mail id="mail2">
	...
	</mail>
</mails>
```

<h3>Mail ID</h3>
Every Mail tag should have an Id. The Id must be unique in the Mail XML file.
It will be called by <a href="mail.send.md">mail.send</a>.

<h3>Param</h3>
You can define params in TO CC BCC MDN SUBJECT BODY just write :param .
The mdn tag means "Disposition-Notification-To".

<h4>Encode</h3>
Pay attention to the mark "&lt;". You must write it like "&amp;lt;" to match the xml diction.