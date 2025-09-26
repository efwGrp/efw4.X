# Msg: タグ属性用

`Msg` タグを他のタグ属性内で直接使用することはできません。ただし、この目的のために `Msg:` を使用できます。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" param1="msg:msg1" /> // または Msg:msg1, MSG:msg1
...
</body>
```
