# Prop: for Tag Attributes

You can use `Prop:` to retrieve values from `efw.properties`.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" myparam="prop:part.myparam" /> // or Prop:part.myparam, PROP:part.myparam
...
</body>
```
