<H1>Prop: for Tag Attribute</H1>
You can use Prop: to get value from efw.properties.
<pre>
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;body&gt;
...
&lt;efw:Part path="part.jsp" appurl="prop:sub1.appurl" /&gt;		//or Prop:sub1.appurl , PROP:sub1.appurl
...
&lt;/body&gt;
</pre>
