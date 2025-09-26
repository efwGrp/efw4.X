# event.fire

`fire` 函数用于执行应用程序事件。其返回值是 [Result](result.md) 类的实例。

## 示例

```javascript
var data = {
	"#txtUser" : "Wang"
};
return (new Result()).runat("body").withdata({
	"#txtUser" : "Wang"
}).alert("hello world!").concat(event.fire("subEvent", data));
```

| 调用 | 返回值 |
|---|---|
| `event. fire ( eventId, params )` | [`Result`](result.md) |
| `event. fire ( eventId, params, server )` | [`Result`](result.md) |

| 参数 | 类型 | 描述 |
|---|---|---|
| `eventId` | `String` | 事件文件名。 |
| `params` | `JSON 对象` | 发送给事件的值。<br>```{"param1":value1,"param2":value2,...}``` |
| `server` | `String` | 从远程服务器调用事件。<br>```http://remoteserver/efwapp``` |