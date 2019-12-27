<H1>Batch Event</H1>
<pre>
////////////////////////////////////////
//web/WEB-INF/efw/event/myEvent.js
////////////////////////////////////////
var <b>myEvent</b>={};
myEvent.<b>service</b>={
	max:10,
	message:'system is busy,please wait a while',
	retriable:true,
	interval:20,
};
myEvent.<b>paramsFormat</b> = { 
                                "#txt_teststring" : "<b>display-name</b>:Test String;<b>max-length</b>:10;",
                                "#txt_testnumber" : "<b>format</b>:#,##0.00;<b>required</b>:true;<b>display-name</b>:Test Number;<b>min</b>:-10.00;<b>max</b>:1,000.00",
                                "#txt_testdate"   : function(){
                                                        var date1=new Date();
                                                        var date2=new Date();
                                                        date2.setDate(date1.getDate()+6);
                                                        return "<b>format</b>:yyyy-MM-dd;<b>required</b>:true;<b>display-name</b>:Test Date;"
                                                               +"<b>min</b>:"+date1.format("yyyy-MM-dd")+";"
                                                               +"<b>max</b>:"+date2.format(,"yyyy-MM-dd")+";" ;
                                                    },
                                ... 
                            };
myEvent.<b>fire</b>         = function ( requestParams ) {
                                return (new Result()).alert("hello world! Your entries are correct.");
                            };
</pre>
<HR>

<H3>Event Variable</H3>
The event variable must be same to the event file name. In the sample, it is "myEvent".

<H3>Service Definition</H3>
<pre>
myEvent.service = {
    max: 10,
    message:'System busy please wait.',
    retriable:true,
    interval:20,
};
</pre>

<table>
<tbody><tr>
    <th>Parameters</th>
    <th>Description</th>
    <th>Attention</th>
</tr>
<tr>
    <td>max</td>
    <td>The max requests count can be execute at the same time.</td>
    <td>"max" is requried for events with service definition.</td>
</tr>
<tr>
    <td>message</td>
    <td>the message when the max requests count is reached.</td>
    <td>"message" is optional.</td>
</tr>
<tr>
    <td>retriable</td>
    <td>The event will try to re-execute automatically or not.</td>
    <td>The default value is false.</td>
</tr>
<tr>
    <td>interval</td>
    <td>The interval for re-execution.</td>
    <td>The default value is 30 seconds. "interval" is enable only when "retriable" is true.</td>
</tr>
</tbody></table>

<H3>Params Format</H3>
<pre>myEvent.paramsFormat = {
                     selector1 : null,
                     selector2 : "checkStyle",
                     selector3 : function(){ return "checkStyle"; },
                   { selector4 : ... , },
                 [ { selector5 : ... , } ],
             };
</pre>
To reference JQuery about the rules of selectors.
<table>
<tbody><tr>
    <th>Type</th>
    <th>Description</th>
    <th>Normal</th>
    <th>Abnormal</th>
</tr>
<tr>
    <td>selector : null</td>
    <td>To get a single input data from the client by the JQuery selector without input checking.</td>
    <td>If one html tag is matched to the selector, the value attribute or text attribute will be looked as the input data to the fire method.</td>
    <td>Error if multi tags are matched to the selector.</td>
</tr>
<tr>
    <td>selector : "checkStyle"</td>
    <td>To get a single input data from the element matched by the JQuery selector with input checking.</td>
    <td>If the input data is matched to the check style, it will be used.</td>
    <td>Error if multi tags are matched to the selector.<br>
    	Error if the input data is not matched the check style.
    </td>
</tr>
<tr>
    <td>selector : function(){ return "checkStyle"; } </td>
    <td>To get a single input data from the element with input checking matched by the JQuery selector which is created by a function.</td>
    <td>If the input data is matched to the check style, it will be used.</td>
    <td>Error if multi tags are matched to the selector.<br>
    	Error if the input data is not matched the check style.
    </td>
</tr>
<tr>
    <td>selector : {...}</td>
    <td>To get several input datas stored in the element matched by the selector.</td>
    <td>If one element is matched to the selector, it will be used. And the selector will be as the context to the sub selectors.</td>
    <td>Error if multi tags are matched to the selector.</td>
</tr>
<tr>
    <td>selector : [{...}]</td>
    <td>To get an array of input datas stored in the element matched by the selector.</td>
    <td>Multi elements matched to the selector will be as the context to the sub selectors.</td>
    <td>-</td>
</tr>
</tbody></table>


<H3>Check Style</H3>
<table>
	<tr><th>Item</th><th>Value</th><th>Description</th><th>Error</th></tr>
	<tr><td>display-name</td><td>String</td><td>The element name which will be shown in the check error message.</td><td></td></tr>
	<tr><td>max-length</td><td>Number</td><td>The max length for an element.</td><td>MaxLengthOverMessage</td></tr>
	<tr><td>format</td><td>String</td><td>The number format or date format expected to an element.</td><td>NumberIsReuqiredMessage or DateIsReuqiredMessage</td></tr>
	<tr><td>min</td><td>String</td><td>The min (formatted) value to an element.</td><td>MinOrMaxOverMessage or MinOverMessage</td></tr>
	<tr><td>max</td><td>String</td><td>The max (formatted) value to an element.</td><td>MinOrMaxOverMessage or MaxOverMessage</td></tr>
	<tr><td>required</td><td>Boolean</td><td>The element is must or not.</td><td>IsRequiredMessage</td></tr>
	<tr><td>accept</td><td>String</td><td>The extension file-names seperated by "," which will be accepted as uploading files. </td><td>NotAcceptMessage</td></tr>
</table>
<H3>Fire Method</H3>

<H3>Event Return</H3>
The event return must be void or an instance of Result.

<H3>i18n Message Key</H3>
For muti-language, you can set mesage keys in next items. To see details in <a href="../samples/i18nSample/WEB-INF/efw/event/i18nSampleTest.js">the Sample</a>.
<li>display-name in check style.
<li>any string value in Result object.
