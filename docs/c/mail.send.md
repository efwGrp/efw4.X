# mail.send

`send` 函数用于使用在 mail XML 配置文件中定义的模板发送电子邮件。

## 示例

```javascript
mail.send("mails","test01",{"to":"you@abc.def","nowdate":new Date(),"username":"Wang"});
```

## API

| 调用 | 返回值 |
|---|---|
| `mail. send ( groupId, mailId, params )` | `void` | 

| 参数 | 类型 | 描述 |
|---|---|---|
| `groupId` | `String` | `"SubFolder/FileName"`. `SubFolder` 相对于 `efw.mail.folder`。`FileName` 是一个邮件 XML 文件的名称。 |
| `mailId` | `String` | 邮件 XML 文件中 `mail` 标签的 ID。 |
| `params` | `JSON 对象` | 邮件 XML 文件中邮件定义所需的值。示例：<br>```{"param1":value1,"param2":value2,...}``` |