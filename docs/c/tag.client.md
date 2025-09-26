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
| `major` | No | `"4"` | 设置 Bootstrap 的主版本 (2, 3, 4, or 5)。 |
| `lang` | No | `"en"` | 设置语言。语言文件应位于多语言文件夹中。 |
| `nopromise` | No | `"false"` |如果您的浏览器不支持 JavaScript Promises，则设置为“true”。|

##### jQuery UI 主题

| | | | | |
|---|---|---|---|---|
|base|black-tie|blitzer|cupertino|dark-hive|
|![Base Theme](../img/themes/base.png)|![Black Tie Theme](../img/themes/black-tie.png)|![Blitzer Theme](../img/themes/blitzer.png)|![Cupertino Theme](../img/themes/cupertino.png)|![Dark Hive Theme](../img/themes/dark-hive.png)|
|dot-luv|eggplant|excite-bike|flick|hot-sneaks|
!![Dot Luv Theme](../img/themes/dot-luv.png)|![Eggplant Theme](../img/themes/eggplant.png)|![Excite Bike Theme](../img/themes/excite-bike.png)|![Flick Theme](../img/themes/flick.png)|![Hot Sneaks Theme](../img/themes/hot-sneaks.png)|
|humanity|le-frog|mint-choc|overcast|pepper-grinder|
|![Humanity Theme](../img/themes/humanity.png)|![Le Frog Theme](../img/themes/le-frog.png)|![Mint Choc Theme](../img/themes/mint-choc.png)|![Overcast Theme](../img/themes/overcast.png)|![Pepper Grinder Theme](../img/themes/pepper-grinder.png)|
|redmond|smoothness|south-street|start|sunny|
|![Redmond Theme](../img/themes/redmond.png)|![Smoothness Theme](../img/themes/smoothness.png)|![South Street Theme](../img/themes/south-street.png)|![Start Theme](../img/themes/start.png)|![Sunny Theme](../img/themes/sunny.png)|
|swanky-purse|trontastic|ui-darkness|ui-lightness|vader|
|![Swanky Purse Theme](../img/themes/swanky-purse.png)|![Trontastic Theme](../img/themes/trontastic.png)|![UI Darkness Theme](../img/themes/ui-darkness.png)|![UI Lightness Theme](../img/themes/ui-lightness.png)|![Vader Theme](../img/themes/vader.png)|
