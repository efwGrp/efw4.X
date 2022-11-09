<H1>Part Tag</H1>
It will be more easy to include a common page part made by JSP with Part tag.
<pre>
&lt;%@ taglib prefix=&quot;efw&quot; uri=&quot;efw&quot; %&gt;
&lt;body&gt;
...
&lt;efw:Part path="part.jsp" param1="####" param2="####" /&gt;		//or efw:part , efw:PART
...
&lt;/body&gt;
</pre>


<h2>Attributes</h2>
<table>
<tr><th>Name</th><th>Required</th><th>Default</th><th>Description</th></tr>
<tr><td>path</td><td>Yes</td><td></td><td>A relative page path to the application url.</td></tr>
<tr><td>appurl</td><td>No</td><td>""</td><td>If the part is in a remote sub one, set the remote sub application url here.</td></tr>
<tr><td>shareSessions</td><td>No</td><td>""</td><td>A string of comma-separated session ids for sharing the main application session values to a sub application.</td></tr>
<tr><td>{any}</td><td>No</td><td>""</td><td>Any value you want to send to.</td></tr>
</table>


You can get the params in the part jsp by request.getAttribute like the next.

<pre>
<%=request.getAttribute("param1")%>	//this coding is for local part.
<%=request.getAttribute("param2")%>
<%=request.getParameter("param1")%>	//this coding is for reomote part.
<%=request.getParameter("param2")%>
&lt;efw:attr key="param1"/> //or use this coding for both.
&lt;efw:attr key="param2"/> 
</pre>


If you want send dynamic value to a part attr, you can do it like this.
<pre>
&lt;% 
String param1="hello";
%>
&lt;efw:part path="part.jsp" param1="<%=param1%>"/>
</pre>