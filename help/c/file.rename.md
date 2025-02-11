# file.rename

`rename` 函数用于重命名文件或文件夹。

## 示例

```javascript
file.rename("myFolder/myFile.txt","yourFile.txt");
file.rename("myFolder","yourFolder");
```

## API

| 调用 | 返回值 |
|---|---|
| `file. rename ( orgPath, newName )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `orgPath` | `String` | 相对于存储的文件或文件夹的相对路径（源）。 |
| `newName` | `String` | 新的文件或文件夹名称。 |