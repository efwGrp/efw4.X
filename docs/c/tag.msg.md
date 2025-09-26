# Msg 标签

`Msg` 标签用于在 JSP 中显示多语言字符串。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Msg key="here"/> // 或 efw:msg, efw:MSG
...
</body>
```

key 应该在语言 XML 文件中定义。

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<entry key="here">here</entry>
</properties>
```

## 属性

| 名称 | 是否必需 | 默认值 | 描述 |
|---|---|---|---|
| `key` | 是 |  | 多语言字符串的键。 |
| `default` | 否 | `""` | 如果 `key` 未在语言 XML 文件中定义，则显示的默认值。 |