<H1>data-shortcut Attribute</H1>

"data-shortcut" is established as one of HTML5 custom attributes to control behaviors of button elements at client. 
Efw framework will add shortcut behaviors to button elements by data-shortcut attributes when page-loading.

<h2>Sample for JSP</h2>
<pre>
	&lt;input type=&quot;button&quot; <b>data-shortcut="F1"</b>&gt;
	&lt;input type=&quot;button&quot; <b>data-shortcut="CTRL+A"</b>&gt;
	&lt;input type=&quot;button&quot; <b>data-shortcut="ALT+Z"</b>&gt;
</pre>

<h2>API</h2>
<table>
<tr><th>Shortcut Key</th></tr>
<tr><td>F1 ... F12</td></tr>
<tr><td>CTRL+A ... CTRL+Z</td></tr>
<tr><td>ALT+A ... ALT+Z</td></tr>
</table>
