# mail.send

The `send` function is used to send emails using templates defined in the mail XML configuration.

## Sample

```javascript
mail.send("mails","test01",{"to":"you@abc.def","nowdate":new Date(),"username":"Wang"});
```

## API

| Calling | Returning |
|---|---|
| `mail. send ( groupId, mailId, params )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `groupId` | `String` | `"SubFolder/FileName"`. `SubFolder` is relative to `efw.mail.folder`. `FileName` is the name of a mail XML file. |
| `mailId` | `String` | The ID of a `mail` tag within a mail XML file. |
| `params` | `JSON Object` | Values required by the mail definition in the mail XML file. Example:<br>```{"param1":value1,"param2":value2,...}``` |
