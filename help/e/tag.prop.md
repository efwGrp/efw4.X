# Prop Tag

The `Prop` tag displays a string defined in `efw.properties` within a JSP page.

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<body>
...
<efw:Prop key="here"/> // or efw:prop, efw:PROP
...
</body>
```

The key should be defined in efw.properties .

## Attributes

| Name | Required | Default | Description |
|---|---|---|---|
| `key` | Yes |  | The key for the property string. |
| `default` | No | `""` | The default value to display if the `key` is not defined in `efw.properties`. |

