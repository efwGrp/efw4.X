<H1>Msg Tag</H1>
To print muti-language string in JSP.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Msg key="here"/>		//or efw:msg , efw:MSG
...
</body>
```

The key should be defined in Language XML.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<entry key="here">here</entry>
</properties>
```

<h2>Attributes</h2>
<table>
<tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr>
<tr><td>key</td><td>Yes</td><td></td><td>The identity of the muti-language string.</td></tr>
<tr><td>default</td><td>No</td><td>""</td><td>The default value if the key has not been defined in Language XML.</td></tr>
</table>
