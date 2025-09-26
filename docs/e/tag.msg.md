# Msg Tag

The `Msg` tag displays multi-language strings in JSP.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Msg key="here"/> // or efw:msg, efw:MSG
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

## Attributes

| Name | Required | Default | Description |
|---|---|---|---|
| `key` | Yes |  | The key for the multi-language string. |
| `default` | No | `""` | The default value to display if the `key` is not defined in the Language XML file. |
