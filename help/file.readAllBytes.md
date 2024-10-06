<H1>file.readAllBytes</H1>

The readAllBytes function is established to load a binary file into a bytes array. 
<h2>Sample</h2>

```javascript
var ary=file.readAllBytes("Roboto-Italic.ttf");
var uint8Array = new Uint8Array(ary.length);
uint8Array.set(Java.from(ary));

```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>file . readAllBytes ( path )</td><td>byte[]</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>path</td><td>String</td><td>The relative file or folder path to the storage.</td></tr>
</table>
