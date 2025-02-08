# Result.withdata

The `withdata` function provides the data to be used with the most recent `runat` call.  It can only be called once per `runat`. Subsequent calls within the same `runat` have no effect.

## Sample

```javascript
var result = new Result();
result
.runat("#table1")
.remove("tr")
.append("<tr><td>{data1}</td><td>{{data2}}</td></tr>")
.withdata([
    {"data1":"hellworld1", "data2":"<span style='color:greed'>OK</span>"},
    {"data1":"hellworld2", "data2":"<span style='color:red'>NG</span>"},
])
.runat("body")
.withdata({
    "#text1":"good morning",
    "#text2":"good day"
});
```

## API

| Calling | Returning |
|---|---|
| `result. withdata ( data )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `data` | `Array` or `Object` | The data to be displayed on the web page. <br> If used with the `append` function, the `withdata` argument *must* be an array. Otherwise, it can be an object. |

The sample for `data`.
```javascript
//as an array
[{maskkey1: value1, maskkey2: value2 ...},{...}]

//as an object
{selector1: value1, selector2: value2 }
```