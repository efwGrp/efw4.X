# EFW関数

EFW関数は、JSPからAJAXでサーバーイベントを呼び出すために提供されています。サーバーイベントを呼び出す際に、パラメータを送信したり、結果を受け取ったりする必要はありません。必要なのはイベントIDを送信することだけです。

## JSPのサンプル

```html
<input type="button" value="送信" onclick="Efw('helloWorld_sendMessage')">
```

## API

| 呼び出し |
|---|
| `Efw ( eventId )` |
| `Efw ( eventId, manualParams )` |
| `Efw ( eventId, server )` |
| `Efw ( eventId, manualParams, server )` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `eventId` | `String` | イベントファイルの名前。 |
| `manualParams` | `JSONオブジェクト` | jQueryセレクタで定義できない値を送信する場合に使用します。<br>```{"mode":"edit"}``` |
| `server` | `String` | EFWで構築された別のWebサーバーアプリケーションへのCORS接続のURL。<br>```http://127.0.0.1:8080/myApp``` |
