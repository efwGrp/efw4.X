# data-shortcut属性

`data-shortcut`は、HTML5のカスタム属性の一つとして、クライアント側のボタン要素の振る舞いを制御するために用意されています。EFWフレームワークは、ページ読み込み時に`data-shortcut`属性を持つボタン要素にショートカットの振る舞いを追加します。

## JSPのサンプル

```html
<input type="button" data-shortcut="F1">
<input type="button" data-shortcut="CTRL+A">
<input type="button" data-shortcut="ALT+Z">
```

## API

| ショートカットキー |
|---|
| F1 ... F12 |
| CTRL+A ... CTRL+Z |
| ALT+A ... ALT+Z |