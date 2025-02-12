# Client 标签

要使用 Efw 进行开发，你需要将几个 `.js` 和 `.css` 文件导入到你的 JSP 页面中。`Client` 标签简化了此过程。

```jsp
...
<%@ taglib prefix="efw" uri="efw" %>
<head>
...
<efw:Client baseurl="/appfolder" mode="jquery-ui" theme="base" lang="en" /> // efw:client 或 efw:CLIENT
...
</head>
```
## 属性

| 名称 | 是否必需 | 默认值 | 描述 |
|---|---|---|---|
| `baseurl` | 否 | `"."` | Web 应用程序的基础 URL。如果你的页面不在根文件夹中，则这是必需的。 |
| `mode` | 否 | `"jquery-ui"` | 设置 UI 框架为 `"jquery-ui"` 或 `"bootstrap"`。 |
| `theme` | 否 | `"base"` | 设置 jQuery UI 的主题。 |
|  |  |  | **jQuery UI 主题：**<br><table><tr><th>base<br>![Base Theme](../img/themes/base.png)</th><th>black-tie<br>![Black Tie Theme](../img/themes/black-tie.png)</th><th>blitzer<br>![Blitzer Theme](../img/themes/blitzer.png)</th><th>cupertino<br>![Cupertino Theme](../img/themes/cupertino.png)</th><th>dark-hive<br>![Dark Hive Theme](../img/themes/dark-hive.png)</th></tr><tr><th>dot-luv<br>![Dot Luv Theme](../img/themes/dot-luv.png)</th>
