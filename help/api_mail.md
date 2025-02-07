# Mail XML

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

### Mail ID
Every `<mail>` tag should have an `id`. The `id` must be unique within the Mail XML file. It will be called by [mail.send](mail.send.md).

### Param
You can define params in `TO`, `CC`, `BCC`, `MDN`, `SUBJECT`, and `BODY` just by writing `:param`. The `mdn` tag means "Disposition-Notification-To".

#### Encode
Pay attention to the mark "<". You must write it like "&amp;lt;" to conform to XML syntax.