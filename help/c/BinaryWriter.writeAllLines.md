# BinaryWriter.writeAllLines

该函数用于将所有行写入文件。

## Sample

```javascript
//test.txt 文件的内容是
//"12345678901234567890"
var binaryWriter = new BinaryWriter("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20);
var ary = new Array(2);
ary[0] = ["a","b","c"];
ary[1] = ["d","e","f"];
binaryWriter.writeAllLines(ary);

//test.txt 文件的内容变为：
//"a    b         c    d    e         f    "
```

## API

| 调用 | 返回值 |
|---|---|
| `binaryWriter. writeAllLines ( ary )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `ary` | `Array` | 期望被写入的数组矩阵。 |