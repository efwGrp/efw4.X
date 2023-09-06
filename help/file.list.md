<H1>file.list</H1>

The list function is established to get an array of files or sub folders information.

<h2>Sample</h2>

```javascript
var infos = file.list("myFolder");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>file . list ( path )</td><td>Array of <a href="file.FileInfo.md">FileInfo</a></td></tr>
<tr><td>file . list ( path , withoutFolderLength )</td><td>Array of <a href="file.FileInfo.md">FileInfo</a></td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative folder path to the storage.</td></tr>
<tr><td>withoutFolderLength</td><td>Boolean</td><td>A flag to get sub folders size or not. The default value is false.</td></tr>
</table>
