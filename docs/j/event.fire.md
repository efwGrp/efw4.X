# event.fire

`fire`関数は、アプリケーションイベントを実行するために使用されます。その戻り値は[Result](result.md)クラスのインスタンスです。

## サンプル

```javascript
var data = {
	"#txtUser" : "Wang"
};
return (new Result()).runat("body").withdata({
	"#txtUser" : "Wang"
}).alert("hello world!").concat(event.fire("subEvent", data));
```

| 呼び出し | 戻り値 |
|---|---|
| `event. fire ( eventId, params )` | [`Result`](result.md) |
| `event. fire ( eventId, params, server )` | [`Result`](result.md) |

| パラメータ | 型 | 説明 |
|---|---|---|
| `eventId` | `String` | イベントファイル名。 |
| `params` | `JSON Object` | イベントに値を送信します。<br>```{"param1":value1,"param2":value2,...}``` |
| `server` | `String` | リモートサーバーからイベントを呼び出す場合。<br>```http://remoteserver/efwapp``` |