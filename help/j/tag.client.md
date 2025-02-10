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
|  |  |  | **jQuery UI テーマ:**<br><table><tr><th>base<br>![Base Theme](../img/themes/base.png)</th><th>black-tie<br>![Black Tie Theme](../img/themes/black-tie.png)</th><th>blitzer<br>![Blitzer Theme](../img/themes/blitzer.png)</th><th>cupertino<br>![Cupertino Theme](../img/themes/cupertino.png)</th><th>dark-hive<br>![Dark Hive Theme](../img/themes/dark-hive.png)</th></tr><tr><th>dot-luv<br>![Dot Luv Theme](../img/themes/dot-luv.png)</th><th>eggplant<br>![Eggplant Theme](../img/themes/eggplant.png)</th><th>excite-bike<br>![Excite Bike Theme](../img/themes/excite-bike.png)</th><th>flick<br>![Flick Theme](../img/themes/flick.png)</th><th>hot-sneaks<br>![Hot Sneaks Theme](../img/themes/hot-sneaks.png)</th></tr><tr><th>humanity<br>![Humanity Theme](../img/themes/humanity.png)</th><th>le-frog<br>![Le Frog Theme](../img/themes/le-frog.png)</th><th>mint-choc<br>![Mint Choc Theme](../img/themes/mint-choc.png)</th><th>overcast<br>![Overcast Theme](../img/themes/overcast.png)</th><th>pepper-grinder<br>![Pepper Grinder Theme](../img/themes/pepper-grinder.png)</th></tr><tr><th>redmond<br>![Redmond Theme](../img/themes/redmond.png)</th><th>smoothness<br>![Smoothness Theme](../img/themes/smoothness.png)</th><th>south-street<br>![South Street Theme](../img/themes/south-street.png)</th><th>start<br>![Start Theme](../img/themes/start.png)</th><th>sunny<br>![Sunny Theme](../img/themes/sunny.png)</th></tr><tr><th>swanky-purse<br>![Swanky Purse Theme](../img/themes/swanky-purse.png)</th><th>trontastic<br>![Trontastic Theme](../img/themes/trontastic.png)</th><th>ui-darkness<br>![UI Darkness Theme](../img/themes/ui-darkness.png)</th><th>ui-lightness<br>![UI Lightness Theme](../img/themes/ui-lightness.png)</th><th>vader<br>![Vader Theme](../img/themes/vader.png)</th></tr></table> |
| `major` | いいえ | `"4"` | Bootstrapのメジャーバージョン（2、3、4、または5）を設定します。 |
| `lang` | いいえ | `"en"` | 言語を設定します。言語ファイルは多言語フォルダに配置する必要があります。 |
| `nopromise` | いいえ | `"false"` | ブラウザがJavaScript Promiseをサポートしていない場合は`"true"`に設定します。 |