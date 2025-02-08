# メールXML

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
        <subject>About :about</subject>
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

### メールID

すべての`<mail>`タグは`id`を持つ必要があります。`id`はMail XMLファイル内で一意である必要があります。これは[mail.send](mail.send.md)によって呼び出されます。

### パラメータ

`TO`、`CC`、`BCC`、`MDN`、`SUBJECT`、および`BODY`内で、`:`paramのように書くだけでパラメータを定義できます。`mdn`タグは "Disposition-Notification-To" (配信通知先) を意味します。

#### エンコード

"<"記号に注意してください。XML構文に準拠するため、"&amp;lt;"のように記述する必要があります。