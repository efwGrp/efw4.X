<H1>Global Event</H1>
<pre>
////////////////////////////////////////
//web/WEB-INF/efw/event/global.js
////////////////////////////////////////
var global={};
global.fire=function(){
...
};
</pre>
<HR>

<H3>Event Variable</H3>
The event variable must be named as "global" which is same to the file name.

<H3>Fire Method</H3>
Pay attention not to operate the session object in the global event.

<H3>Event Return</H3>
The global event does not return anything.

