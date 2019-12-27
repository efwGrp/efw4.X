<H1>Batch Event</H1>
<pre>
////////////////////////////////////////
//web/WEB-INF/efw/event/myBatchEvent.js
////////////////////////////////////////
var <b>myBatchEvent</b>={};
myBatchEvent.<b>paramsFormat</b> = { 
                                "sysDate" : "<b>format</b>:yyyy/MM/dd;<b>display-name</b>:sysDate;"
                            };
myBatchEvent.<b>fire</b>         = function ( params ) {
                                //return;
                                //return { "param" : params.sysDate };
                                return (new Batch())
                                .echo("hello world!")
                                .exit(1);
                            };
</pre>
<HR>

<H3>Event Variable</H3>
The event variable must be same to the event file name. In the sample, it is "myBatchEvent".

<H3>Params Format</H3>
Same to <a href="api_webevent.md">Web Event</a>.
<H3>Check Style</H3>
Same to <a href="api_webevent.md">Web Event</a>.
<H3>Fire Method</H3>

<H3>Event Return</H3>
The event return must be void or an instance of <a href="batch.new.md">Batch</a> or anything can be changed to JSON.
