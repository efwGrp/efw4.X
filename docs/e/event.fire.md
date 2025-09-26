# event.fire

The `fire` function is used to execute an application event. Its return is an instance of the [Result](result.md) class.

## Sample

```javascript
var data = {
	"#txtUser" : "Wang"
};
return (new Result()).runat("body").withdata({
	"#txtUser" : "Wang"
}).alert("hello world!").concat(event.fire("subEvent", data));
```

| Calling | Returning |
|---|---|
| `event. fire ( eventId, params )` | [`Result`](result.md) |
| `event. fire ( eventId, params, server )` | [`Result`](result.md) |

| Parameters | Type | Description |
|---|---|---|
| `eventId` | `String` | The event file name. |
| `params` | `JSON Object` | To send values to the event.<br>```{"param1":value1,"param2":value2,...}``` |
| `server` | `String` | To call the event from a remote server.<br>```http://remoteserver/efwapp``` |