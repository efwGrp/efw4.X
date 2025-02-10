# EFW 函数

EFW 函数用于通过 AJAX 从 JSP 调用服务器事件。调用服务器事件时，无需发送参数或接收结果。您唯一需要做的就是发送事件 ID。

## JSP 示例

```html
<input type="button" value="发送" onclick="Efw('helloWorld_sendMessage')">
```

## API

| 调用 |
|---|
| `Efw ( eventId )` |
| `Efw ( eventId, manualParams )` |
| `Efw ( eventId, sever )` |
| `Efw ( eventId, manualParams, sever )` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `eventId` | `String` | 事件文件的名称。 |
| `manualParams` | `JSON 对象` | 用于发送一些无法通过 jQuery 选择器定义的值。<br>```{"mode":"edit"}``` |
| `sever` | `String` |  由 EFW 构建的到另一个 Web 服务器应用程序的 CORS 连接的 URL。<br>```http://127.0.0.1:8080/myApp``` |