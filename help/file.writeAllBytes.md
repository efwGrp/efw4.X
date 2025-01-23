<H1>file.writeAllBytes</H1>

The writeAllBytes function is established to all binary bytes to a file.
<h2>Sample</h2>

```javascript
var ary=file.readAllBytes("Roboto-Italic.ttf");
file.writeAllBytes("test.ttf",ary);

```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>file . writeAllBytes ( path, content )</td><td>byte[]</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative file or folder path to the storage.</td></tr>
<tr><td>content</td><td>byte[]</td><td>The byte array.</td></tr>
</table>
