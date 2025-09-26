# Prop：用于标签属性

你可以使用 `Prop:` 从 `efw.properties` 文件中检索值。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" myparam="prop:part.myparam" /> // 或 Prop:part.myparam, PROP:part.myparam
...
</body>
```
