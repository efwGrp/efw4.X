# Record.group

`group` 函数根据 `Record` 中指定的字段对记录进行分组（阶层化）。

## 示例

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

| 调用 | 返回值 |
|---|---|
| `record. group ( key1, key2,... )` | `Object` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `key` | `String` | 字段名。 |