# load

ファイル、URL、またはスクリプトオブジェクトからスクリプトをロードして評価します。

## サンプル

```javascript
// ファイル、URLからスクリプトをロードできます。

load("foo.js"); // 現在のディレクトリにあるファイル "foo.js" からスクリプトをロードします。
load("[http://www.example.com/t.js](http://www.example.com/t.js)"); // 指定されたURLからスクリプトファイルをロードします。

// オブジェクトのプロパティからスクリプトをロードします。

// オブジェクトは "script" および "name" プロパティを持つ必要があります。
//    "script" プロパティには、スクリプトの文字列コードが含まれています。
//    "name" プロパティは、スクリプトからエラーを報告する際に使用する名前を指定します。
// これは、デバッグ目的でスクリプト文字列に関連付けられた名前を持つことを除いて、標準の "eval" とほぼ同じです。

load({ script: "print('hello')", name: "myscript.js"})

// load は、"nashorn:"、"fx:"、"classpath:" などの擬似URLからもロードできます。

// "nashorn:" 擬似URLスキーム
// Nashorn の組み込みスクリプト用。

// Nashorn のパーサーサポートスクリプトをロード - グローバルスコープに 'parse' 関数を定義します。

load("nashorn:parser.js");

// Mozilla 互換スクリプトをロード - Rhino 互換のために、importPackage、importClass などのグローバル関数を定義します。

load("nashorn:mozilla_compat.js");

// JavaFX サポートスクリプト用の "fx:" 擬似URLスキーム
// jjs クラスパスの jar およびディレクトリからスクリプトをロードするための "classpath:" 擬似URLスキーム

load("classpath:foo.js"); // jjs -classpath ディレクトリで見つかった最初の foo.js をロードします。
```
from https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions
