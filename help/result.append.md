# Result.append

The `append` function adds content to the element specified by the most recent `runat` call. It can only be called once per `runat`. Subsequent calls within the same `runat` have no effect.

## Sample

```javascript
var result = new Result();
result
.runat("#table1")
.remove("tr")
.append("<tr><td>{data1}</td><td>{{data2}}</td></tr>");
```

## API

| Calling | Returning |
|---|---|
| `result. append ( mask )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `mask` | `String` | The HTML snippet with data placeholders that will replace the removed tags. Example: <br> ```<tr><td>{data1}</td><td>{{data2}}</td></tr>```<br> `{data1}` will be replaced and HTML-encoded with the value of the `data1` field. `{{field}}` will be replaced but *not* HTML-encoded. |