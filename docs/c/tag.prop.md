# Prop 标签

`Prop` 标签用于在 JSP 页面中显示 `efw.properties` 文件中定义的字符串。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Prop key="here"/> // 或 efw:prop, efw:PROP
...
</body>
```

`key` 应该在 `efw.properties` 文件中定义。

## 属性

| 名称 | 是否必需 | 默认值 | 描述 |
|---|---|---|---|
| `key` | 是 |  | 属性字符串的键。 |
| `default` | 否 | `""` | 如果 `key` 未在 `efw.properties` 中定义，则显示的默认值。 |