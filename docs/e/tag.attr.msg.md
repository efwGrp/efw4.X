# Msg: for Tag Attributes

You cannot use the `Msg` tag directly within other tag attributes. However, you can use `Msg:` for this purpose.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" param1="msg:msg1" /> // or Msg:msg1, MSG:msg1
...
</body>
```
