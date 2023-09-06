<H1>Threads.run</H1>

The run function is established to run all the thread of the threads object.

<h2>Sample</h2>

```javascript
var threads = new Threads(4);
threads.add({"index":0 ,"successed":false ,run : operate});
threads.add({"index":1 ,"successed":false ,run : operate});
threads.add({"index":2 ,"successed":false ,run : operate});
threads.add({"index":3 ,"successed":false ,run : operate});
var errorData = threads.run().seek("successed", "eq", false);
if(errorData.length !=0){
	var errorDataArr = errorData.getArray();
	for(var i = 0 ; i < errorDataArr.length ; i++){
		errorDataArr[i].index.debug("operation has errors"); 
	}
}
	

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
<tr><td>Threads . Run ( )</td><td>Record contained all of thead object.</td></tr>
</table>


