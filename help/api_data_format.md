# data-format Attribute

`data-format` is established as one of HTML5 custom attributes to control behaviors of input elements at client. 
The EFW framework will add focus and blur behaviors to input elements by `data-format` attributes when page-loading. 

## Sample for JSP

```html
<input type="text" data-format="#,##0.00">
<input type="text" data-format="0.00%">
<input type="text" data-format="yyyy-MM-dd HH:mm:ss SSS">
<input type="text" data-format="yy-M-d H:m:s S">
```

## API

To reference the API of [formatter](formatter&rounder.md), without supporting Japan WAREKI.
