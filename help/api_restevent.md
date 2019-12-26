<H1>Rest Event</H1>
<pre>
////////////////////////////////////////
//web/WEB-INF/efw/event/customer.js
////////////////////////////////////////
//Call it by the url http://localhost:8080/restSample/efwRestAPI/customer/u001

var customer={};
customer.PUT=function(keys,params){
...
};
customer.POST=function(keys,params){
...
};
customer.GET=function(keys){
...
};
customer.DELETE=function(keys){
...
};
</pre>
<HR>

<H3>Event Variable</H3>
The event variable must be same to the event file name. In the sample, it is "customer".


<H3>PUT POST GET DELETE Method</H3>

<H3>Event Return</H3>
The event return must be void or an instance of object or an instance of array for JSON.stringify.

<H3>HTTP Status</H3>
<table>
<tr><th>Status Code</th><th>Description</th></tr>
<tr><td>( 404 ) Not Found</td><td>Any not exists event id in the url.</td></tr>
<tr><td>( 500 ) Internal Server Error</td><td>Any exception in methods.</td></tr>
<tr><td>( 200 ) OK</td><td>The return value is not null.</td></tr>
<tr><td>( 204 ) No Content</td><td>The return value is null.</td></tr>
</table>
