# Prop: タグ属性用

`Prop:` を使用して、`efw.properties` から値を取得できます。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" myparam="prop:part.myparam" /> // または Prop:part.myparam, PROP:part.myparam
...
</body>
```
