<H1>Prop: for Tag Attribute</H1>
You can use Prop: to get value from efw.properties.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" appurl="prop:sub1.appurl" />		//or Prop:sub1.appurl , PROP:sub1.appurl
...
</body>
```
