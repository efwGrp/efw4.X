<H1>Msg Tag</H1>
To print muti-language string in JSP.
<pre>
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;body&gt;
...
&lt;efw:Msg key="here"/&gt;		//or efw:msg , efw:MSG
...
&lt;/body&gt;
</pre>

The key should be defined in Language XML.

<pre>
&lt;?xml version="1.0" encoding="UTF-8" standalone="no"?&gt;
&lt;!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd"&gt;
&lt;properties&gt;
&lt;entry key="here"&gt;here&lt;/entry&gt;
&lt;/properties&gt;
</pre>
