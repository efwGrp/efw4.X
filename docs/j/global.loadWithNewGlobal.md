# loadWithNewGlobal

`loadWithNewGlobal`は、ファイル、URL、またはスクリプトオブジェクトからスクリプトをロードするという点で`load`関数と似ています。ただし、`load`とは異なり、`loadWithNewGlobal`は新しいECMAScriptグローバルスコープオブジェクトを作成し、スクリプトをその中にロードします。ロードされたスクリプトのグローバル定義は、この新しいグローバルスコープに配置されます。さらに、ロードされたスクリプトが組み込みオブジェクト（例えば`String.prototype.indexOf`）に行った変更は、呼び出し元のグローバルスコープには*反映されません*。これらの変更は、新しく作成されたグローバルスコープにのみ影響します。

## サンプル

```javascript
loadWithNewGlobal({
    script: "foo = 333; print(foo)",
    name: "test"
});
 
// "foo"は新しいグローバルで定義されており、ここでは定義されていないため、undefinedと出力されます。
print(typeof foo);
```
from https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions