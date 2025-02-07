# any.debug

The `debug` function is established to print information of any objects to the console.

`{ any } = { String | Number | Boolean | Date | Array | Function | Object | Record | Result }`

## Sample

```javascript
"hello world!".debug("test1");
(123).debug("test1");
(true).debug("test1");
(new Date()).debug("test2");

return (new Result()).runat().withData({
	"#userId" : "Wang"
}.debug("test3")).debug("test4");
```

## API

| Calling | Returning |
|---|---|
| `{any} . debug ( label )` | `{any}` |

| Parameters | Type | Description |
|---|---|---|
| `label` | `String` | The label printed before the debugging info. |