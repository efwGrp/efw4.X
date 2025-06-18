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
|? |? |? | **jQuery UI Themes:**<br>base<br>![Base Theme](../img/themes/base.png)<br>black-tie<br>![Black Tie Theme](../img/themes/black-tie.png)<br>blitzer<br>![Blitzer Theme](../img/themes/blitzer.png)<br>cupertino<br>![Cupertino Theme](../img/themes/cupertino.png)<br>dark-hive<br>![Dark Hive Theme](../img/themes/dark-hive.png)<br>dot-luv<br>![Dot Luv Theme](../img/themes/dot-luv.png)<br>eggplant<br>![Eggplant Theme](../img/themes/eggplant.png)<br>excite-bike<br>![Excite Bike Theme](../img/themes/excite-bike.png)<br>flick<br>![Flick Theme](../img/themes/flick.png)<br>hot-sneaks<br>![Hot Sneaks Theme](../img/themes/hot-sneaks.png)<br>humanity<br>![Humanity Theme](../img/themes/humanity.png)<br>le-frog<br>![Le Frog Theme](../img/themes/le-frog.png)<br>mint-choc<br>![Mint Choc Theme](../img/themes/mint-choc.png)<br>overcast<br>![Overcast Theme](../img/themes/overcast.png)<br>pepper-grinder<br>![Pepper Grinder Theme](../img/themes/pepper-grinder.png)<br>redmond<br>![Redmond Theme](../img/themes/redmond.png)<br>smoothness<br>![Smoothness Theme](../img/themes/smoothness.png)<br>south-street<br>![South Street Theme](../img/themes/south-street.png)<br>start<br>![Start Theme](../img/themes/start.png)<br>sunny<br>![Sunny Theme](../img/themes/sunny.png)<br>swanky-purse<br>![Swanky Purse Theme](../img/themes/swanky-purse.png)<br>trontastic<br>![Trontastic Theme](../img/themes/trontastic.png)<br>ui-darkness<br>![UI Darkness Theme](../img/themes/ui-darkness.png)<br>ui-lightness<br>![UI Lightness Theme](../img/themes/ui-lightness.png)<br>vader<br>![Vader Theme](../img/themes/vader.png) |
| `major` | No | `"4"` | Sets the major version for Bootstrap (2, 3, 4, or 5). |
| `lang` | No | `"en"` | Sets the language. Language files should be located in the multi-language folder. |
| `nopromise` | No | `"false"` | Set to `"true"` if your browser does not support JavaScript Promises. |

