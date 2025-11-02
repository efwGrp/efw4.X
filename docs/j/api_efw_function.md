# EFW関数

EFW関数は、JSPからAJAXでサーバーイベントを呼び出すために提供されています。サーバーイベントを呼び出す際に、パラメータを送信したり、結果を受け取ったりする必要はありません。必要なのはイベントIDを送信することだけです。
長期間のイベントの場合は、イベントを webSocket モードで呼び出す方が適切であり、イベント js で複数の結果を返すことができます。

## JSPのサンプル

```html
<input type="button" value="送信" onclick="Efw('helloWorld_sendMessage')">
<input type="button" value="送信" onclick="Efw('helloWorld_sendMessage',true)">
```

## API

| 呼び出し |
|---|
| `Efw ( eventId )` |
| `Efw ( eventId, manualParams )` |
| `Efw ( eventId, server )` |
| `Efw ( eventId, manualParams, server )` |
| `Efw ( eventId, wsMode )` |
| `Efw ( eventId, manualParams, wsMode )` |
| `Efw ( eventId, sever, wsMode )` |
| `Efw ( eventId, manualParams, sever, wsMode )` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `eventId` | `String` | イベントファイルの名前。 |
| `manualParams` | `JSONオブジェクト` | jQueryセレクタで定義できない値を送信する場合に使用します。<br>```{"mode":"edit"}``` |
| `server` | `String` | EFWで構築された別のWebサーバーアプリケーションへのCORS接続のURL。<br>```http://127.0.0.1:8080/myApp``` |
| `wsMode` | `Boolean` | webSocket モードでイベントを呼び出すためのフラグ。 |