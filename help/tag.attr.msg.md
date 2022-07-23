<H1>Msg: for Tag Attribute</H1>
You can not use msg tag in other tag's attributes. But you can use Msg: in this case.
<pre>
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;body&gt;
...
&lt;efw:Part path="part.jsp" param1="msg:msg1" /&gt;		//or Msg:msg1 , MSG:msg1
...
&lt;/body&gt;
</pre>
