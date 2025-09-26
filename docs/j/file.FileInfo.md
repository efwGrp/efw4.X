# FileInfo

`FileInfo`オブジェクトは、ファイルまたはフォルダに関する情報を格納するために使用されます。

```javascript
{
  name: String,
  length: Number,
  lastModified: Date,
  absolutePath: String,
  mineType: String, // Typo here: should be mimeType
  isHidden: Boolean,
  isBlank: Boolean,
}
```