# Webイベント

```javascript
////////////////////////////////////////
//web/WEB-INF/efw/event/myWebEvent.js
////////////////////////////////////////
var myWebEvent = {};
myWebEvent.service = {
    max: 10,
    message: 'system is busy,please wait a while',
    retriable: true,
    interval: 20,
};
myWebEvent.paramsFormat = {
    "#txt_teststring": "display-name:Test String;max-length:10;",
    "#txt_testnumber": "format:#,##0.00;required:true;display-name:Test Number;min:-10.00;max:1,000.00",
    "#txt_testdate": function() {
        var date1 = new Date();
        var date2 = new Date();
        date2.setDate(date1.getDate() + 6);
        return "format:yyyy-MM-dd;required:true;display-name:Test Date;"
            + "min:" + date1.format("yyyy-MM-dd") + ";"
            + "max:" + date2.format("yyyy-MM-dd") + ";"; // Fixed typo here
    },
    "#txt_password": "secure:true", //the secure value will be encoded before sending.
  ...
};
myWebEvent.fire = function(requestParams) {
    return (new Result()).alert("hello world! Your entries are correct.");
};
```


### イベント変数

イベント変数は、イベントファイル名と同じである必要があります。この例では、"myWebEvent" です。

### サービス定義

```javascript
myWebEvent.service = {
    max: 10,
    message: 'システムが混み合っています。しばらくお待ちください。',
    retriable: true,
    interval: 20,
};
```

| パラメータ | 説明 | 注意事項 |
|---|---|---|
| `max` | 同時に実行できる最大リクエスト数。 | "max" はサービス定義を持つイベントに必須です。 |
| `message` | 最大リクエスト数に達した場合のメッセージ。 | "message" はオプションです。 |
| `retriable` | イベントが自動的に再実行を試みるかどうか。 | デフォルト値は `false` です。 |
| `interval` | 再実行の間隔（秒）。 | デフォルト値は30秒です。"interval" は "retriable" が `true` の場合にのみ有効です。 |

### パラメータフォーマット

```javascript
myWebEvent.paramsFormat = {
    selector1 : null,
    selector2 : "checkStyle",
    selector3 : function(){ return "checkStyle"; },
    { selector4 : ... , },
    [ { selector5 : ... , } ],
};
```

### パラメータフォーマット - セレクタ規則

セレクタの規則についてはjQueryを参照してください。

| タイプ | 説明 | 正常 | 異常 |
|---|---|---|---|
| `selector : null` | 入力チェックなしに、jQueryセレクタによってクライアントから単一の入力データを取得します。 | 1つのHTMLタグがセレクタに一致する場合、`value`属性または`text`属性が`fire`メソッドの入力データとして使用されます。 | 複数のタグがセレクタに一致する場合はエラー。 |
| `selector : "checkStyle"` | 入力チェック付きで、jQueryセレクタによって一致する要素から単一の入力データを取得します。 | 入力データがチェックスタイルに一致する場合、それが使用されます。 | 複数のタグがセレクタに一致する場合はエラー。<br>入力データがチェックスタイルに一致しない場合はエラー。 |
| `selector : function(){ return "checkStyle"; }` | 関数によって作成されたjQueryセレクタによって一致する要素から、入力チェック付きで単一の入力データを取得します。 | 入力データがチェックスタイルに一致する場合、それが使用されます。 | 複数のタグがセレクタに一致する場合はエラー。<br>入力データがチェックスタイルに一致しない場合はエラー。 |
| `selector : {...}` | セレクタによって一致する要素に格納された複数の入力データを取得します。 | 1つの要素がセレクタに一致する場合、それが使用されます。また、セレクタはサブセレクタのコンテキストになります。 | 複数のタグがセレクタに一致する場合はエラー。 |
| `selector : [{...}]` | セレクタによって一致する要素に格納された入力データの配列を取得します。 | セレクタに一致する複数の要素が、サブセレクタのコンテキストになります。 | - |

### チェックスタイル

| 項目 | 値 | 説明 | エラーメッセージ |
|---|---|---|---|
| `display-name` | `String` | チェックエラーメッセージに表示される要素名。 |  |
| `max-length` | `Number` | 要素の最大長。 | `MaxLengthOverMessage` |
| `format` | `String` | 要素に期待される数値または日付の形式。 | `NumberIsReuqiredMessage` または `DateIsReuqiredMessage` |
| `min` | `String` | 要素の最小値（フォーマット済み）。 | `MinOrMaxOverMessage` または `MinOverMessage` |
| `max` | `String` | 要素の最大値（フォーマット済み）。 | `MinOrMaxOverMessage` または `MaxOverMessage` |
| `required` | `Boolean` | 要素が必須かどうか。 | `IsRequiredMessage` |
| `accept` | `String` | アップロードファイルとして許可される拡張子名をカンマ区切りで指定。 | `NotAcceptMessage` |
| `secure` | `String` | 要素値をエンコードするかどうか。 |  |

### fireメソッド

### イベントの戻り値

イベントの戻り値は、voidであるか、[Result](result.new.md)のインスタンスである必要があります。

### i18nメッセージキー

多言語サポートのために、以下の項目にメッセージキーを設定できます。

*   チェックスタイルの`display-name`
*   `Result`オブジェクト内の任意の文字列値

詳細は次のサンプルを参照してください。

```javascript
var helloI18n_submit = {};
helloI18n_submit.paramsFormat = {};
helloI18n_submit.fire = function(params) {
    return new Result()
        .alert("{here} {language} {testservermsg}");
}
```