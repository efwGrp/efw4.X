# data-format属性

`data-format`は、HTML5のカスタム属性の一つとして、クライアント側の入力要素の振る舞いを制御するために用意されています。EFWフレームワークは、ページ読み込み時に`data-format`属性を持つ入力要素にフォーカス時およびブラー時の振る舞いを追加します。

## JSPのサンプル

```html
<input type="text" data-format="#,##0.00">
<input type="text" data-format="0.00%">
<input type="text" data-format="yyyy-MM-dd HH:mm:ss SSS">
<input type="text" data-format="yy-M-d H:m:s S">
```

## API

日本和暦をサポートせずに、[formatter](formatter&rounder.md)のAPIを参照してください。