# Prop Tag

`Prop`タグは、JSPページ内で`efw.properties`に定義された文字列を表示します。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Prop key="here"/> // または efw:prop, efw:PROP
...
</body>
```

キーは`efw.properties`で定義される必要があります。

## 属性

| 名前 | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `key` | はい |  | プロパティ文字列のキー。 |
| `default` | いいえ | `""` | `efw.properties`で`key`が定義されていない場合に表示するデフォルト値。 |