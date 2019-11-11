<H1>SQL XML</H1>

<pre>
test.xml
------------------------------------
&lt;?xml version="1.0" encoding="UTF-8"?>
&lt;!DOCTYPE sqls>
&lt;sqls>
	&lt;sql id="sql1" paramPrefix=":" dynamicPrefix="@">
&lt;!-- this is comment -->
/**
	this is comment
**/
//	this is comment

SELECT field1,field2,field3 FROM table1
WHERE
field1= :param1
&lt;if exists="param2"> and field2 &amp;lt; :param2&lt;/if>
&lt;if notexists="param2"> and field2 &amp;lt; 500&lt;/if>
&lt;if istrue="param3.substr(0,1)=='x'"> and field3 = :param3 &lt;/if>
&lt;if isfalse="param3.substr(0,1)=='x'"> and field3 = 'y' &lt;/if>
order by field3, @param4
	&lt;/sql>
	&lt;sql id="sql2">
	...
	&lt;/sql>
&lt;/sqls>

</pre>


<h3>SQL ID</h3>
Every SQL tag should have an Id. The Id must be unique in the SQL XML file.
It will be called by <a href="db.select.md">db.select</a> or <a href="db.change.md">db.change</a>.

<h3>Param</h3>
You can define params in SQL just write :param .<br>
The <b>paramPrefix</b> attribute of sql tag is an option. You can redefine it if ":" is a must char in your sql.

<h3>Dynamic</h3>
You can add dynamic sql parts SQL just write @dynamic .<br>
The <b>dynamicPrefix</b> attribute of sql tag is an option. You can redefine it if "@" is a must char in your sql.

<h3>If</h3>
You can do deffient operation by judging whether a param is existed or not, or a javascript formula is true or not.<BR>
The if tag can be nested.

<h3>Commet</h3>
You can write comment in several ways.

<h4>Encode</h3>
Pay attention to the mark "&lt;". You must write it like "&amp;lt;" to match the xml diction.