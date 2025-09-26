# file.move

The `move` function is used to move an original file or folder to a new location. If the destination already exists, it will *not* be overwritten.

## Sample

```javascript
file.move("myFile.txt","yourFile.txt");
file.move("myFolder","yourFolder");
```

## API

| 调用 | 返回值 |
|---|---|
| `file. move ( orgPath, newPath )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `orgPath` | `String` | 相对于存储的文件或文件夹的相对路径（源）。 |
| `newPath` | `String` | 相对于存储的文件或文件夹的相对路径（目标）。 |