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
| `major` | いいえ | `"4"` | Bootstrapのメジャーバージョン（2、3、4、または5）を設定します。 |
| `lang` | いいえ | `"en"` | 言語を設定します。言語ファイルは多言語フォルダに配置する必要があります。 |
| `nopromise` | いいえ | `"false"` | ブラウザがJavaScript Promiseをサポートしていない場合は`"true"`に設定します。 |


##### jQuery UI テーマ

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
