# Pdf.getFontNames

`getFontNames`函数用于获取文件夹中所有字体文件的名称。

## 示例

```javascript
var ary = Pdf.getFontNames("fonts");
```

## API

| 调用 | 返回值 |
|---|---|
| `Pdf. getFontNames ( fontsPath )` | `Array` |
| `Pdf. getFontNames ( fontsPath, fontsPathIsAbs )` | `Array` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `fontsPath` | `String` | 字体文件的文件夹路径。|
| `fontsPathIsAbs` | `Boolean` | 指定fontsPath是否是绝对路径。|
