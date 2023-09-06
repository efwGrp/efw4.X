<H1>Attr Tag</H1>
To print a dynamic parameter string in a part JSP.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<!-- codes in the part jsp -->
<div>
...
<efw:Attr key="param1"/>		//or efw:attr , efw:ATTR
...
</div>
```

The key should be defined as Part tag dynamic params.

<h2>Attributes</h2>
<table>
<tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr>
<tr><td>key</td><td>Yes</td><td></td><td>The identity of the dynamic parameter.</td></tr>
</table>
