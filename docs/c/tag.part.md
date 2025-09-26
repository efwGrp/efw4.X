# Part 标签

`Part` 标签简化了包含使用 JSP 创建的公共页面部分的过程。

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" param1="####" param2="####" /> // 或 efw:part, efw:PART
...
</body>
```


## 属性

| 名称 | 是否必需 | 默认值 | 描述 |
|---|---|---|---|
| `path` | 是 |  | 应用程序中页面的相对路径。 |
| `{any}` | 否 | `""` | 你想传递给包含页面的任何值。 |

你可以使用 `request.getAttribute` 或 `efw:attr` 标签在包含的 JSP 中检索参数，如下所示：

```jsp
<%= request.getAttribute("param1") %>  // 这可行。
<%= request.getAttribute("param2") %>
<efw:attr key="param1"/> // 或者，使用这个。
<efw:attr key="param2"/>
```


要将动态值传递给 `Part` 标签属性，你可以使用 JSP 脚本片段，如下所示：

```jsp
<%
  String param1 = "hello";
%>
<efw:Part path="part.jsp" param1="<%= param1 %>"/>
```