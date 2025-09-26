# data-shortcut 属性

`data-shortcut` 作为 HTML5 自定义属性之一，用于控制客户端按钮元素的行为。EFW 框架在页面加载时，将通过 `data-shortcut` 属性为按钮元素添加快捷键行为。

## JSP 示例

```html
<input type="button" data-shortcut="F1">
<input type="button" data-shortcut="CTRL+A">
<input type="button" data-shortcut="ALT+Z">
```

## API

| 快捷键 |
|---|
| F1 ... F12 |
| CTRL+A ... CTRL+Z |
| ALT+A ... ALT+Z |