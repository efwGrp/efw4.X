<H1>file.duplicate</H1>

The duplicate function is established to make a copy of a file or folder.
If the destination is existed, it will NOT be overwritted.
<h2>Sample</h2>

```javascript
file.duplicate("myFile.txt","yourFile.txt");
file.duplicate("myFolder","yourFolder");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>file . duplicate ( srcPath, destPath )</td><td>Boolean</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>srcPath</td><td>String</td><td>The relative file or folder path to the storage for coping.</td></tr>
<tr><td>destPath</td><td>String</td><td>The relative file or folder path to the storage for saving.</td></tr>
</table>
