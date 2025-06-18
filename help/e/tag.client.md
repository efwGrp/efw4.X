# Client Tag

To develop with Efw, you need to import several `.js` and `.css` files into your JSP pages. The `Client` tag simplifies this process.

```jsp
...
<%@ taglib prefix="efw" uri="efw" %>
<head>
...
<efw:Client baseurl="/appfolder" mode="jquery-ui" theme="base" lang="en" /> // efw:client or efw:CLIENT
...
</head>
```
## Attributes

| Name | Required | Default | Description |
|---|---|---|---|
| `baseurl` | No | `"."` | The web application base URL. This is required if your page is not in the base folder. |
| `mode` | No | `"jquery-ui"` | Sets the UI framework to `"jquery-ui"` or `"bootstrap"`. |
| `theme` | No | `"base"` | Sets the theme for jQuery UI. |
| `major` | No | `"4"` | Sets the major version for Bootstrap (2, 3, 4, or 5). |
| `lang` | No | `"en"` | Sets the language. Language files should be located in the multi-language folder. |
| `nopromise` | No | `"false"` | Set to `"true"` if your browser does not support JavaScript Promises. |

##### jQuery UI Themes

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
