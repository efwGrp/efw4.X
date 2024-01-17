<H1>Part Tag</H1>
It will be more easy to include a common page part made by JSP with Part tag.

```javascript
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Part path="part.jsp" param1="####" param2="####" />		//or efw:part , efw:PART
...
</body>
```


<h2>Attributes</h2>
<table>
<tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr>
<tr><td>path</td><td>Yes</td><td></td><td>A relative page path to the application url.</td></tr>
<tr><td>{any}</td><td>No</td><td>""</td><td>Any value you want to send to.</td></tr>
</table>


You can get the params in the part jsp by request.getAttribute like the next.

```javascript
<%=request.getAttribute("param1")%>	//this coding can work well.
<%=request.getAttribute("param2")%>
<efw:attr key="param1"/> //or use this coding.
<efw:attr key="param2"/> 
```


If you want send dynamic value to a part attr, you can do it like this.

```javascript
<% 
String param1="hello";
%>
<efw:part path="part.jsp" param1="<%=param1%>"/>
```