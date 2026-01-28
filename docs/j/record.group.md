# Record.group

`group`関数は、指定された`Record`内のフィールドでレコードをグルーピング（階層化）します。

## サンプル

```javascript
var ary=[
	{"x":"a1","y":"b1","z":"c1"},
	{"x":"a1","y":"b1","z":"c2"},
	{"x":"a1","y":"b2","z":"c3"},
	{"x":"a2","y":"b2","z":"c4"},
	{"x":"a2","y":"b3","z":"c5"},
	{"x":"a2","y":"b3","z":"c6"},
];
var obj=new Record(ary).group("x","y");
/*
obj is the next
{"a1":{"b1":[{"z":"c1"},
             {"z":"c2"}
            ],
       "b2":[{"z":"c3"}]
      },
 "a2":{"b2":[{"z":"c4"}],
       "b3":[{"z":"c5"},
             {"z":"c6"}
            ]
      }
}
*/
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `record. group ( key1, key2,... )` | `Object` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `key` | `String` | フィールド名 |