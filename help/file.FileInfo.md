# FileInfo

The `FileInfo` object is used to store information about a file or folder.

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