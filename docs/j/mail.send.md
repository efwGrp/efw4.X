# mail.send

`send`関数は、メールXML構成で定義されたテンプレートを使用してメールを送信するために使用されます。

## サンプル

```javascript
mail.send("mails","test01",{"to":"you@abc.def","nowdate":new Date(),"username":"Wang"});
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `mail. send ( groupId, mailId, params )` | `void` |
| `mail. send ( groupId, mailId, params, inBackground )` | `void` | 

| パラメータ | 型 | 説明 |
|---|---|---|
| `groupId` | `String` | `"SubFolder/FileName"`。`SubFolder`は`efw.mail.folder`からの相対パスです。`FileName`はメールXMLファイルの名前です。 |
| `mailId` | `String` | メールXMLファイル内の`mail`タグのID。 |
| `params` | `JSON Object` | メールXMLファイルのメール定義に必要な値。例：<br>```{"param1":value1,"param2":value2,...}``` |
| `inBackground` | `Boolean` | 電子メールのバックグラウンド送信フラグ。 |