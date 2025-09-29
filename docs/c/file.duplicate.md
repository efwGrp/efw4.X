# file.duplicate

`duplicate` 函数用于创建文件或文件夹的副本。如果目标已经存在，则*不会*被覆盖。

## 示例

```javascript
file.duplicate("myFile.txt","yourFile.txt");
file.duplicate("myFolder","yourFolder");
```

## API

| 调用 | 返回值 |
|---|---|
| `file. duplicate ( srcPath, destPath )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `srcPath` | `String` | 相对于存储的要复制的文件或文件夹的相对路径。 |
| `destPath` | `String` | 相对于存储的要保存的文件或文件夹的相对路径。 |