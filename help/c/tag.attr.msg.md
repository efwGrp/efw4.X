# Msg：用于标签属性

你不能直接在其他标签属性中使用 `Msg` 标签。但是，你可以使用 `Msg:` 来达到此目的。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" param1="msg:msg1" /> // 或 Msg:msg1, MSG:msg1
...
</body>
```
