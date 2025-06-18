# クライアントタグ

Efwを使って開発するには、いくつかの`.js`ファイルと`.css`ファイルをJSPページにインポートする必要があります。`Client`タグはこのプロセスを簡略化します。

```jsp
...
<%@ taglib prefix="efw" uri="efw" %>
<head>
...
<efw:Client baseurl="/appfolder" mode="jquery-ui" theme="base" lang="en" /> // efw:client または efw:CLIENT
...
</head>
```
## 属性

| 名前 | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `baseurl` | いいえ | `"."` | WebアプリケーションのベースURL。ページがベースフォルダにない場合は必須です。 |
| `mode` | いいえ | `"jquery-ui"` | UIフレームワークを`"jquery-ui"`または`"bootstrap"`に設定します。 |
| `theme` | いいえ | `"base"` | jQuery UIのテーマを設定します。 |
|  |  |  | **jQuery UI テーマ:**<br>base<br>![Base Theme](../img/themes/base.png)<br>black-tie<br>![Black Tie Theme](../img/themes/black-tie.png)<br>blitzer<br>![Blitzer Theme](../img/themes/blitzer.png)<br>cupertino<br>![Cupertino Theme](../img/themes/cupertino.png)<br>dark-hive<br>![Dark Hive Theme](../img/themes/dark-hive.png)<br>dot-luv<br>![Dot Luv Theme](../img/themes/dot-luv.png)<br>eggplant<br>![Eggplant Theme](../img/themes/eggplant.png)<br>excite-bike<br>![Excite Bike Theme](../img/themes/excite-bike.png)<br>flick<br>![Flick Theme](../img/themes/flick.png)<br>hot-sneaks<br>![Hot Sneaks Theme](../img/themes/hot-sneaks.png)<br>humanity<br>![Humanity Theme](../img/themes/humanity.png)<br>le-frog<br>![Le Frog Theme](../img/themes/le-frog.png)<br>mint-choc<br>![Mint Choc Theme](../img/themes/mint-choc.png)<br>overcast<br>![Overcast Theme](../img/themes/overcast.png)<br>pepper-grinder<br>![Pepper Grinder Theme](../img/themes/pepper-grinder.png)<br>redmond<br>![Redmond Theme](../img/themes/redmond.png)<br>smoothness<br>![Smoothness Theme](../img/themes/smoothness.png)<br>south-street<br>![South Street Theme](../img/themes/south-street.png)<br>start<br>![Start Theme](../img/themes/start.png)<br>sunny<br>![Sunny Theme](../img/themes/sunny.png)<br>swanky-purse<br>![Swanky Purse Theme](../img/themes/swanky-purse.png)<br>trontastic<br>![Trontastic Theme](../img/themes/trontastic.png)<br>ui-darkness<br>![UI Darkness Theme](../img/themes/ui-darkness.png)<br>ui-lightness<br>![UI Lightness Theme](../img/themes/ui-lightness.png)<br>vader<br>![Vader Theme](../img/themes/vader.png) |
| `major` | いいえ | `"4"` | Bootstrapのメジャーバージョン（2、3、4、または5）を設定します。 |
| `lang` | いいえ | `"en"` | 言語を設定します。言語ファイルは多言語フォルダに配置する必要があります。 |
| `nopromise` | いいえ | `"false"` | ブラウザがJavaScript Promiseをサポートしていない場合は`"true"`に設定します。 |