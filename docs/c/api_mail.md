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
        <attachment></attachment>
    </mail>
    <mail id="mail2">
    ...
    </mail>
</mails>
```

### Mail ID

每个 `<mail>` 标签都应该有一个 `id`。`id` 在 Mail XML 文件中必须是唯一的。它将由 [mail.send](mail.send.md) 调用。

### 参数

您只需编写 `:param` 即可在 `TO`、`CC`、`BCC`、`MDN`、`SUBJECT`、`BODY` 和 `ATTACHMENT` 中定义参数。`mdn` 标签表示“Disposition-Notification-To”（送达通知）。

您可以使用 `;` 为 `TO`、`CC`、`BCC`、`MDN` 和 `ATTACHMENT` 写入多个数据。

`ATTACHMENT` 必须包含要附加的文件的storage相对路径名。

#### 编码

请注意“<”标记。您必须将其写为“&amp;lt;”才能符合 XML 语法。