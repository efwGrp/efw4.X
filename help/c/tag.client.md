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
|  |  |  | **jQuery UI 主题:**<br>base<br>![Base Theme](../img/themes/base.png)<br>black-tie<br>![Black Tie Theme](../img/themes/black-tie.png)<br>blitzer<br>![Blitzer Theme](../img/themes/blitzer.png)<br>cupertino<br>![Cupertino Theme](../img/themes/cupertino.png)<br>dark-hive<br>![Dark Hive Theme](../img/themes/dark-hive.png)<br>dot-luv<br>![Dot Luv Theme](../img/themes/dot-luv.png)<br>eggplant<br>![Eggplant Theme](../img/themes/eggplant.png)<br>excite-bike<br>![Excite Bike Theme](../img/themes/excite-bike.png)<br>flick<br>![Flick Theme](../img/themes/flick.png)<br>hot-sneaks<br>![Hot Sneaks Theme](../img/themes/hot-sneaks.png)<br>humanity<br>![Humanity Theme](../img/themes/humanity.png)<br>le-frog<br>![Le Frog Theme](../img/themes/le-frog.png)<br>mint-choc<br>![Mint Choc Theme](../img/themes/mint-choc.png)<br>overcast<br>![Overcast Theme](../img/themes/overcast.png)<br>pepper-grinder<br>![Pepper Grinder Theme](../img/themes/pepper-grinder.png)<br>redmond<br>![Redmond Theme](../img/themes/redmond.png)<br>smoothness<br>![Smoothness Theme](../img/themes/smoothness.png)<br>south-street<br>![South Street Theme](../img/themes/south-street.png)<br>start<br>![Start Theme](../img/themes/start.png)<br>sunny<br>![Sunny Theme](../img/themes/sunny.png)<br>swanky-purse<br>![Swanky Purse Theme](../img/themes/swanky-purse.png)<br>trontastic<br>![Trontastic Theme](../img/themes/trontastic.png)<br>ui-darkness<br>![UI Darkness Theme](../img/themes/ui-darkness.png)<br>ui-lightness<br>![UI Lightness Theme](../img/themes/ui-lightness.png)<br>vader<br>![Vader Theme](../img/themes/vader.png) |
| `major` | No | `"4"` | 设置 Bootstrap 的主版本 (2, 3, 4, or 5)。 |
| `lang` | No | `"en"` | 设置语言。语言文件应位于多语言文件夹中。 |
| `nopromise` | No | `"false"` |如果您的浏览器不支持 JavaScript Promises，则设置为“true”。|

