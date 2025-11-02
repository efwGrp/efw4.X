# EFW 函数

EFW 函数用于通过 AJAX 从 JSP 调用服务器事件。调用服务器事件时，无需发送参数或接收结果。您唯一需要做的就是发送事件 ID。
如果事件持续时间较长，最好在 webSocket 模式下调用该事件，并且可以在事件 js 中返回多个结果。

## JSP 示例

```html
<input type="button" value="发送" onclick="Efw('helloWorld_sendMessage')">
<input type="button" value="发送" onclick="Efw('helloWorld_sendMessage',true)">
```

## API

| 调用 |
|---|
| `Efw ( eventId )` |
| `Efw ( eventId, manualParams )` |
| `Efw ( eventId, sever )` |
| `Efw ( eventId, manualParams, sever )` |
| `Efw ( eventId, wsMode )` |
| `Efw ( eventId, manualParams, wsMode )` |
| `Efw ( eventId, sever, wsMode )` |
| `Efw ( eventId, manualParams, sever, wsMode )` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `eventId` | `String` | 事件文件的名称。 |
| `manualParams` | `JSON 对象` | 用于发送一些无法通过 jQuery 选择器定义的值。<br>```{"mode":"edit"}``` |
| `sever` | `String` |  由 EFW 构建的到另一个 Web 服务器应用程序的 CORS 连接的 URL。<br>```http://127.0.0.1:8080/myApp``` |
| `wsMode` | `Boolean` | 是否以 WebSocket 模式调用事件的标志。 |
