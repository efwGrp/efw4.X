<H1>Efw Function</H1>

The Efw function is established to call server events from JSP in AJAX.
It is not necessary to send params or receive results when calling server events.
The only thing you must to do is sending the event id.

<h2>Sample for JSP</h2>

```html
<input type="button" value="Send" onclick="Efw('helloWorld_sendMessage')">
```
<h2>API</h2>

<table>
<tr><th>Calling</th></tr>
<tr><td>Efw ( eventId )</td></tr>
<tr><td>Efw ( eventId , manualParams )</td></tr>
<tr><td>Efw ( eventId , sever )</td></tr>
<tr><td>Efw ( eventId , manualParams , sever )</td></tr>
</table>

<table>
<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
<tr><td>eventId</td><td>String</td><td>"SubFolder/FileName". SubFolder is relatived from efw.event.folder. FileName is the name of an event file.</td></tr>
<tr><td>manualParams</td><td>JSON Object</td><td>To send some values which can not be defined by JQuery selectors. 

```javascript
{"mode":"edit"}
```

</td></tr>
<tr><td>sever</td><td>String</td><td>The url of cors connections to another web server application constructed by Efw. 

```
http://127.0.0.1:8080/efw
```

</td></tr>
</table>
