<H1>Threads.add</H1>

The add function is established to add a thread into the threads object.

<h2>Sample</h2>

```javascript
var threads = new Threads(4);
threads.add({"index":0 ,"successed":false ,run : operate});	
// operate is a function can set return value in thread object attrubites.
threads.add({"index":1 ,"successed":false ,run : operate});	
threads.add({"index":2 ,"successed":false ,run : operate});	
threads.add({"index":3 ,"successed":false ,run : operate});	

function operate(){
	if(this.index > 2){
		this.successed = false;
	}else{
		this.successed = true;
	}
}
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Threads . Add ( thread )</td><td>Threads</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>thread</td><td>object</td><td>The thread to be added and it must have a function named "run".</td></tr>
</table>
