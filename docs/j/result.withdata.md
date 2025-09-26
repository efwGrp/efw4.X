# Result.withdata

`withdata` 関数は、最新の `runat` 呼び出しで使用するデータを提供します。`runat` ごとに一度だけ呼び出すことができます。同じ `runat` 内の後続の呼び出しは効果がありません。

## サンプル

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

| 呼び出し | 戻り値 |
|---|---|
| `result. withdata ( data )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `data` | `Array` or `Object` | Webページに表示するデータ。<br> `append`関数で使用する場合、`withdata`の引数は*必ず*配列である必要があります。それ以外の場合は、オブジェクトにすることができます。 |

`data`のサンプル。
```javascript
// 配列として
[{maskkey1: value1, maskkey2: value2 ...},{...}]

// オブジェクトとして
{selector1: value1, selector2: value2 }