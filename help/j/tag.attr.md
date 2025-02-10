# Attr タグ

`Attr` タグは、JSPパート内で動的なパラメータ文字列を表示します。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<div>
...
<efw:Attr key="param1"/> // または efw:attr, efw:ATTR
...
</div>
```

`key` 属性は、JSPパートに渡される動的パラメータに対応する必要があります。

## 属性

| 名前 | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `key` | はい |  | 動的パラメータのキー。 |