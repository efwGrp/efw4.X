# Attr 标签

`Attr` 标签用于在 JSP 部分中显示动态参数字符串。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<div>
...
<efw:Attr key="param1"/> // 或 efw:attr, efw:ATTR
...
</div>
```

`key` 属性应该对应于传递给 JSP 部分的动态参数。

## 属性

| 名称 | 是否必需 | 默认值 | 描述 |
|---|---|---|---|
| `key` | 是 |  | 动态参数的键。 |