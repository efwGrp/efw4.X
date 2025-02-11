# file.writeAllLines

The `writeAllLines` function is used to write all lines to a text file.

## Sample

```javascript
file.writeAllLines("myFolder/myFile.txt","abcdefghijklmn","UTF-8");
```

## API

| 调用 | 返回值 |
|---|---|
| `file. writeAllLines ( path, content )` | `String` |
| `file. writeAllLines ( path, content, encoding )` | `String` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 存储文件夹中相对的文本文件路径。 |
| `content` | `String` | 要保存的文本内容。 |
| `encoding` | `String` | 文本文件的字符集名称。默认值为 UTF-8。 |