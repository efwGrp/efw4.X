# Attr Tag

The `Attr` tag displays a dynamic parameter string within a JSP part.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<div>
...
<efw:Attr key="param1"/> // or efw:attr, efw:ATTR
...
</div>
```

The `key` attribute should correspond to a dynamic parameter passed to the JSP part.

## Attributes

| Name | Required | Default | Description |
|---|---|---|---|
| `key` | Yes |  | The key of the dynamic parameter. |