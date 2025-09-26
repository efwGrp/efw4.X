# Part Tag

The `Part` tag simplifies including common page parts created with JSP.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" param1="####" param2="####" /> // or efw:part, efw:PART
...
</body>
```


## Attributes

| Name | Required | Default | Description |
|---|---|---|---|
| `path` | Yes |  | A relative path to the page within the application. |
| `{any}` | No | `""` | Any value you want to pass to the included page. |

You can retrieve the parameters in the included JSP using `request.getAttribute` or the `efw:attr` tag, as shown below:

```jsp
<%= request.getAttribute("param1") %>  // This works.
<%= request.getAttribute("param2") %>
<efw:attr key="param1"/> // Alternatively, use this.
<efw:attr key="param2"/>
```


To pass dynamic values to a `Part` tag attribute, you can use JSP scriptlets, as shown below:

```jsp
<%
  String param1 = "hello";
%>
<efw:Part path="part.jsp" param1="<%= param1 %>"/>
```