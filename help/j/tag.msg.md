# Msgタグ

`Msg`タグはJSPで多言語文字列を表示します。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Msg key="here"/> // または efw:msg, efw:MSG
...
</body>
```

キーは言語XMLで定義する必要があります。

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<entry key="here">here</entry>
</properties>
```

## 属性

| 名前 | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `key` | はい |  | 多言語文字列のキー。 |
| `default` | いいえ | `""` | `key`が言語XMLファイルで定義されていない場合に表示するデフォルト値。 |