# SQL XML

test.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE sqls>
<sqls>
    <sql id="sql1" paramPrefix=":" dynamicPrefix="@">
/**
    this is comment
**/
//  this is comment

SELECT field1,field2,field3 FROM table1
WHERE
field1= :param1
<if exists="param2"> and field2 &lt; :param2</if>
<if notexists="param2"> and field2 &lt; 500</if>
<if istrue="param3.substr(0,1)=='x'"> and field3 = :param3 </if>
<if isfalse="param3.substr(0,1)=='x'"> and field3 = 'y' </if>

    </sql>
    <sql id="sql2">
        <include groupId="test" sqlId="sql1"/>
        order by field3, @param4
    </sql>
</sqls>
```


### SQL ID
Every `<sql>` tag should have an `id`. The `id` must be unique within the SQL XML file. It will be called by [db.select](db.select.md) or [db.change](db.change.md).

### Param
You can define params in SQL just by writing `:param`.<br>
The `paramPrefix` attribute of the `<sql>` tag is optional. You can redefine it if ":" is a required character in your SQL.

### Dynamic
You can add dynamic SQL parts just by writing `@dynamic`.<br>
The `dynamicPrefix` attribute of the `<sql>` tag is optional. You can redefine it if "@" is a required character in your SQL.

### If
You can perform different operations by judging whether a param exists or not, or whether a JavaScript formula is true or not, by setting the `exists`, `notexists`, `istrue`, and `isfalse` attributes. The `<if>` tag can be nested.

### Include
You can include an existing SQL query into your SQL by setting the `groupId` and `sqlId` attributes.<BR>

### Comment
You can write comments in several ways.

#### Encode
Pay attention to the "<" character. You must write it as "&amp;lt;" to conform to XML syntax.
