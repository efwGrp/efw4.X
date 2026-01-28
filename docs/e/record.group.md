# Record.group

The `group` function groups (hierarchizes) records based on the specified fields within a `Record`.

## Sample

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

| Calling | Returning |
|---|---|
| `record. group ( key1, key2,... )` | `Object` |

| Parameters | Type | Description |
|---|---|---|
| `key` | `String` | The field name. |