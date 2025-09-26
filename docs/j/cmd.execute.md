# cmd.execute

`execute`関数は、プログラムまたはシステムコマンドを呼び出すために用意されています。実行中に問題が発生した場合、`CmdExecuteException`がスローされます。

## サンプル

```javascript
cmd.execute(["java","-version"]);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `cmd. execute ( params )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `params` | `Array` | コマンドとパラメータを含む配列。 |