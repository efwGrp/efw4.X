<H1>Msg: for Tag Attribute</H1>
You can not use msg tag in other tag's attributes. But you can use Msg: in this case.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" param1="msg:msg1" />		//or Msg:msg1 , MSG:msg1
...
</body>
```
