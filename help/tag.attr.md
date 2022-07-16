<H1>Attr Tag</H1>
To print a dynamic parameter string in a part JSP.
<pre>
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;!-- codes in the part jsp -->
&lt;div&gt;
...
&lt;efw:Attr key="param1"/&gt;		//or efw:attr , efw:ATTR
...
&lt;/div&gt;
</pre>

The key should be defined as Part tag dynamic params.

<h2>Attributes</h2>
<table>
<tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr>
<tr><td>key</td><td>Yes</td><td></td><td>The identity of the dynamic parameter.</td></tr>
</table>
