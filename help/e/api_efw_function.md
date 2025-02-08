# EFW Function

The EFW function is established to call server events from JSP in AJAX. It is not necessary to send params or receive results when calling server events. The only thing you must do is send the event ID.

## Sample for JSP

```html
<input type="button" value="Send" onclick="Efw('helloWorld_sendMessage')">
```

## API

| Calling |
|---|
| `Efw ( eventId )` |
| `Efw ( eventId, manualParams )` |
| `Efw ( eventId, sever )` |
| `Efw ( eventId, manualParams, sever )` |

| Parameter | Type | Description |
|---|---|---|
| `eventId` | `String` | The name of an event file. |
| `manualParams` | `JSON Object` | To send some values which cannot be defined by jQuery selectors. <br>```{"mode":"edit"}``` |
| `sever` | `String` | The URL of CORS connections to another web server application constructed by EFW. <br>```http://127.0.0.1:8080/myApp``` |
