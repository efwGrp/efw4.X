# data-format 属性

`data-format` 作为 HTML5 自定义属性之一，用于控制客户端输入元素的行为。EFW 框架在页面加载时，将通过 `data-format` 属性为输入元素添加焦点和失焦行为。

## JSP 示例

```html
<input type="text" data-format="#,##0.00">
<input type="text" data-format="0.00%">
<input type="text" data-format="yyyy-MM-dd HH:mm:ss SSS">
<input type="text" data-format="yy-M-d H:m:s S">
```

## API

请参考 [formatter](formatter&rounder.md) 的 API，但不包含对日本和历的支持。