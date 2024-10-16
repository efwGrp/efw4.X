<H1>file.move</H1>

The move function is established to move an orginal file or folder to the new one.
If the destination is existed, it will NOT be overwritted.
<h2>Sample</h2>

```javascript
file.move("myFile.txt","yourFile.txt");
file.move("myFolder","yourFolder");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>file . move ( orgPath, newPath )</td><td>Boolean</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>orgPath</td><td>String</td><td>The relative file or folder path to the storage for moving from.</td></tr>
<tr><td>newPath</td><td>String</td><td>The relative file or folder path to the storage for moving to.</td></tr>
</table>
