# バッチイベント

```javascript
////////////////////////////////////////
//web/WEB-INF/efw/event/myBatchEvent.js
////////////////////////////////////////
var myBatchEvent = {};
myBatchEvent.paramsFormat = {
    "sysDate": "format:yyyy/MM/dd;display-name:sysDate;"
};
myBatchEvent.fire = function(params) {
    //return;
    //return { "param" : params.sysDate };
    return (new Batch())
        .echo("hello world!")
        .exit(1);
};
```

### イベント変数

イベント変数は、イベントファイル名と同じである必要があります。この例では、"myBatchEvent" です。

### パラメータフォーマット

[Webイベント](api_webevent.md)と同じです。

### チェックスタイル

[Webイベント](api_webevent.md)と同じです。

### fireメソッド

### イベントの戻り値

イベントの戻り値は、void、[Batch](batch.new.md)のインスタンス、またはJSONに変換できる任意のオブジェクトである必要があります。
