# elFinder 标签

elFinder 是一个流行的 Web 文件管理器。我们基于 [elFinder 2.1](https://studio-42.github.io/elFinder/) 创建了一个定制版本，并将其作为标签包含在 Efw 中。它必须在 `Client` 标签之后使用，该标签包含 jQuery 和 jQuery UI。为了保护系统文件（如 `Thumb.db`），所有隐藏文件都将不会显示。

![elFinder 标签截图](../img/addition_tag_elfinder.png)

```jsp
<%@ taglib prefix="efw" uri="efw" %>
<head>
  <efw:Client/>
</head>
<body>
  <efw:elFinder id="elFinder1" home="homefolder" height="400" width="800" readonly="false" /> // 或 efw:elfinder, efw:Elfinder, efw:ELFINDER
</body>
```

## 属性

| 名称 | 是否必需 | 默认值 | 描述 |
|---|---|---|---|
| `id` | 是 |  | elFinder 标签的 ID。你可以使用它来访问 elFinder 实例。 |
| `home` | 否 | `""` | 存储文件夹（`/WEB-INF/storage`）的相对路径。你可以通过修改[属性文件](properties.web.md)来配置存储文件夹。 |
| `selection` | 否 | `""` | 主文件夹的相对路径。elFinder 打开时，将选择此路径上的文件或文件夹。 |
| `height` | 否 | `"400"` | elFinder 标签的高度，以像素为单位。 |
| `width` | 否 | `"auto"` | elFinder 标签的宽度，以像素为单位。 |
| `readonly` | 否 | `"false"` | 指定 elFinder 标签是否为只读。 |
| `protected` | 否 | `"false"` | 指定 elFinder 标签是否受保护。如果为 `true`，则对 `setHome` 和 `setReadOnly` 方法的调用将被忽略。 |
| `isAbs` | 否 | `false` | 指定 `home` 路径是否为绝对路径。 |

## 方法

| 调用 | 返回 | 描述 |
|---|---|---|
| `elfinder.setHome(path)` | `void` | 设置 `home` 属性。 |
| `elfinder.setHome(path, selection)` | `void` | 设置 `home` 和 `selection` 属性。 |
| `elfinder.setHeight(height)` | `void` | 设置 `height` 属性。 |
| `elfinder.setWidth(width)` | `void` | 设置 `width` 属性。 |
| `elfinder.setReadOnly(readonly)` | `void` | 设置 `readonly` 属性。 |