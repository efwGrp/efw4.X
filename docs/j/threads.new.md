# new Threads

コンストラクタ関数は、`Threads`オブジェクトを作成します。

## サンプル

```javascript
var threads1 = new Threads();
var threads2 = new Threads(4);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `new Threads ( )` | `Threads` |
| `new Threads ( count )` | `Threads` |

## パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `count` | `Number` | スレッド数。デフォルトは4です。 |