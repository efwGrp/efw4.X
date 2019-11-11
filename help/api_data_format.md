<H1>data-format Attribute</H1>

"data-format" is established as one of HTML5 custom attributes to control behaviors of input elements at client. 
Efw framework will add focus and blur behaviors to input elements by data-format attributes when page-loading. 

<h2>Sample for JSP</h2>
<pre>
	&lt;input type=&quot;text&quot; <b>data-format="#,##0.00"</b>&gt;
	&lt;input type=&quot;text&quot; <b>data-format="0.00%"</b>&gt;
	&lt;input type=&quot;text&quot; <b>data-format="yyyy-MM-dd HH:mm:ss SSS"</b>&gt;
	&lt;input type=&quot;text&quot; <b>data-format="yy-M-d H:m:s S"</b>&gt;
</pre>

<h2>API</h2>

To reference the API of <a href="formatter&rounder.md">formatter</a> ,without supporting to Japan WAREKI.


