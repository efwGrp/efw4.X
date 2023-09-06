<H1>SQL XML</H1>

test.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE sqls>
<sqls>
	<sql id="sql1" paramPrefix=":" dynamicPrefix="@">
<!-- this is comment -->
/**
	this is comment
**/
//	this is comment

SELECT field1,field2,field3 FROM table1
WHERE
field1= :param1
<if exists="param2"> and field2 &amp;lt; :param2</if>
<if notexists="param2"> and field2 &amp;lt; 500</if>
<if istrue="param3.substr(0,1)=='x'"> and field3 = :param3 </if>
<if isfalse="param3.substr(0,1)=='x'"> and field3 = 'y' </if>

	</sql>
	<sql id="sql2">
		<include groupId="test" sqlId="sql1"/>
		order by field3, @param4
	</sql>
</sqls>

```


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
You can do deffient operation by judging whether a param is existed or not, or a javascript formula is true or not,
by setting the <b>exists notexists istrue isfalse </b>attributes.
The if tag can be nested.

<h3>Include</h3>
You can include an existed sql into your sql by setting the <b>groupId sqlId</b> attributes.<BR>
<h3>Commet</h3>
You can write comment in several ways.

<h4>Encode</h3>
Pay attention to the mark "&lt;". You must write it like "&amp;lt;" to match the xml diction.