<H1>Prop Tag</H1>
To print a string defined in efw.properties to JSP.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Prop key="here"/>		//or efw:prop , efw:PROP
...
</body>
```

The key should be defined in efw.properties .

<h2>Attributes</h2>
<table>
<tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr>
<tr><td>key</td><td>Yes</td><td></td><td>The identity of the property string.</td></tr>
<tr><td>default</td><td>No</td><td>""</td><td>The default value if the key has not been defined in efw.properties.</td></tr>
</table>
