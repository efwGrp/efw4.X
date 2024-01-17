<H1>Prop: for Tag Attribute</H1>
You can use Prop: to get value from efw.properties.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" myparam="prop:part.myparam" />		//or Prop:part.myparam , PROP:part.myparam
...
</body>
```
